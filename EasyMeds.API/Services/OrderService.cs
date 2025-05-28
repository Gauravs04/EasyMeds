using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;
using EasyMeds.API.Data;
using EasyMeds.API.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;
        private readonly ITransactionDetailsService _transactionService;

        public OrderService(ApplicationDbContext context, ITransactionDetailsService transactionService)
        {
            _context = context;
            _transactionService = transactionService;
        }

        public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
        {
            var orders = await _context.Orders.ToListAsync();
            return orders.Select(o => new OrderDto
            {
                OrderId = o.OrderId,
                UserId = o.UserId,
                Status = o.Status,
                OrderDate = o.OrderDate,
                TotalAmount = o.TotalAmount,
                TransactionId = o.TransactionId,

            });
        }

        public async Task<OrderDto> GetOrderByIdAsync(Guid orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
                return null;

            return new OrderDto
            {
                OrderId = order.OrderId,
                UserId = order.UserId,
                Status = order.Status,
                OrderDate = order.OrderDate,
                TotalAmount = order.TotalAmount,
                TransactionId = order.TransactionId,
                SupplierId = order.SupplierId,
                SupplierName = _context.Users.Where(s => s.Id == order.SupplierId).Select(d => d.Name).ToString(),
            };
        }

        // public async Task<bool> CreateOrderAsync([FromBody] CreateOrderDto createOrderDto)
        // {
        //     // Create transaction details first
        //     var createTransactionDto = new CreateTransactionDetailsDto
        //     {
        //         Status = TransactionStatus.Pending,
        //         Date = DateTime.UtcNow,
        //         PaymentMethod = createOrderDto.PaymentMethod,
        //         amount = createOrderDto.TransactionAmount
        //     };

        //     var transactionDto = await _transactionService.CreateTransactionDetailsAsync(createTransactionDto);

        //     // Create order with transaction ID
        //     var order = new Orders
        //     {
        //         OrderId = Guid.NewGuid(),
        //         UserId = createOrderDto.UserId,
        //         Status = createOrderDto.Status,
        //         OrderDate = createOrderDto.OrderDate,
        //         TotalAmount = createOrderDto.TotalAmount,
        //         TransactionId = transactionDto.TransactionId,
        //     };

        //     _context.Orders.Add(order);
        //     await _context.SaveChangesAsync();

        //     return true;

        //     // return new OrderDto
        //     // {
        //     //     OrderId = order.OrderId,
        //     //     UserId = order.UserId,
        //     //     Status = order.Status,
        //     //     OrderDate = order.OrderDate,
        //     //     TotalAmount = order.TotalAmount,
        //     //     TransactionId = order.TransactionId
        //     // };
        // }

        public async Task<bool> UpdateOrderAsync(Guid orderId, OrderStatus Status)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
                return false;

            order.Status = Status;

            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return true;

            // return new OrderDto
            // {
            //     OrderId = order.OrderId,
            //     UserId = order.UserId,
            //     Status = order.Status,
            //     OrderDate = order.OrderDate,
            //     TotalAmount = order.TotalAmount,
            //     TransactionId = order.TransactionId,
            // };
        }

        public async Task<bool> DeleteOrderAsync(Guid orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
                return false;

            // Delete transaction details if exists
            if (order.TransactionId.HasValue)
            {
                await _transactionService.DeleteTransactionDetailsAsync(order.TransactionId.Value);
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return true;
        }


        public async Task<string> CheckoutAsync(List<CartItemDto> cartItems, Guid doctorId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var drugIds = cartItems.Select(s => s.DrugId).ToList();

                var drugs = await _context.Drugs
                    .Where(d => drugIds.Contains(d.DrugId))
                    .ToDictionaryAsync(d => d.DrugId);

                var grouped = cartItems.GroupBy(ci => ci.SupplierId);

                var transactionDetails = new TransactionDetails
                {
                    TransactionId = Guid.NewGuid(),
                    Date = DateTime.UtcNow,
                    Status = TransactionStatus.Pending,
                    PaymentMethod = "Card",
                    amount = 0,
                };

                await _context.TransactionDetails.AddAsync(transactionDetails);

                decimal total = 0;

                foreach (var group in grouped)
                {
                    var supplierId = group.Key;

                    var order = new Orders
                    {
                        OrderId = Guid.NewGuid(),
                        SupplierId = supplierId,
                        UserId = doctorId,
                        TransactionId = transactionDetails.TransactionId,
                        OrderDate = DateTime.UtcNow,
                        Status = OrderStatus.Pending,
                        TotalAmount = 0
                    };

                    var orderItems = new List<OrderItems>();
                    decimal orderTotal = 0;

                    foreach (var item in group)
                    {
                        var drug = drugs[item.DrugId];
                        var itemTotal = drug.Price * item.Quantity;

                        orderItems.Add(new OrderItems
                        {
                            OrderItemId = Guid.NewGuid(),
                            OrderId = order.OrderId,
                            DrugId = drug.DrugId,
                            Quantity = item.Quantity
                        });

                        orderTotal += itemTotal;
                    }

                    order.TotalAmount = orderTotal;
                    total += orderTotal;

                    await _context.Orders.AddAsync(order);
                    await _context.OrderItems.AddRangeAsync(orderItems);
                }

                transactionDetails.amount = total;

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return transactionDetails.TransactionId.ToString();
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return ex.Message;
            }
        }

        public async Task<ICollection<OrderDto>> OrderRequest(Guid Id)
        {
            var result = await _context.Orders
                                    .Include(s => s.OrderItems)
                                        .ThenInclude(s=>s.Drugs)
                                    .Include(s => s.TransactionDetails)
                                    .Where(s => s.SupplierId == Id)
                                    .ToListAsync();

            var orderrequest =  result.Select(s=> new OrderDto
            {
                OrderId = s.OrderId,
                Status = s.Status,
                OrderDate = s.OrderDate,
                TotalAmount = s.TotalAmount,
                TransactionId = s.TransactionId,
                SupplierId = s.SupplierId,
                OrderItems = s.OrderItems.Select(s=> new OrderItemDto
                {
                    OrderId = s.OrderId,
                    DrugId = s.DrugId,
                    DrugName = s.Drugs.Name,
                    Quantity = s.Quantity,
                    Price=s.Drugs.Price
                }).ToList(),
                TransactionDetails = s.TransactionDetails == null ? null : new TransactionDetailsDto
                {
                    Status = s.TransactionDetails.Status,
                    Date = s.TransactionDetails.Date,
                    PaymentMethod = s.TransactionDetails.PaymentMethod,
                    amount = s.TransactionDetails.amount
                }
            }).ToList();

            return orderrequest;
        } 
    }
}