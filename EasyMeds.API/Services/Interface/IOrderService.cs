using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;
using EasyMeds.API.DTOs;

namespace API.Services
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDto>> GetAllOrdersAsync();
        Task<OrderDto> GetOrderByIdAsync(Guid orderId);
        // Task<bool> CreateOrderAsync(CreateOrderDto createOrderDto);
        Task<string> CheckoutAsync(List<CartItemDto> cartItems, Guid doctorId);
        Task<bool> UpdateOrderAsync(Guid orderId, OrderStatus Status);
        Task<bool> DeleteOrderAsync(Guid orderId);

        Task<ICollection<OrderDto>> OrderRequest(Guid Id);
    }
}