using System;
using API.Models;

namespace API.DTOs
{
    public class OrderDto
    {
        public Guid OrderId { get; set; }
        public Guid UserId { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public Guid? TransactionId { get; set; }
        public Guid? SupplierId { get; set; }
        public string SupplierName { get; set; }
        public ICollection<OrderItemDto> OrderItems { get; set; }
        public TransactionDetailsDto TransactionDetails { get; set; }
    }


    public class OrderItemDto
    {
        public Guid DrugId { get; set; }
        public string DrugName { get; set; }
        public Guid OrderId { get; set; }

        public decimal Price { get; set; }
        public long Quantity { get; set; }
    }

    public class CreateOrderDto
    {
        public Guid UserId { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string PaymentMethod { get; set; }
        public decimal TransactionAmount { get; set; }
    }

    public class UpdateOrderDto
    { 
        public OrderStatus Status{ get; set; }
    }

}