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
    }

    public class CreateOrderDto
    {
        public Guid UserId { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string PaymentMethod{get;set;}
        public decimal TransactionAmount { get; set; }
    }

    public class UpdateOrderDto
    {
        public OrderStatus Status { get; set; }
        public decimal TotalAmount { get; set; }
    }
}