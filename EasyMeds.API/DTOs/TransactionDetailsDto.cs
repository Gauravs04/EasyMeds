using System;
using API.Models;

namespace API.DTOs
{
    public class TransactionDetailsDto
    {
        public Guid TransactionId { get; set; }
        public TransactionStatus Status { get; set; }
        public DateTime Date { get; set; }
        public string PaymentMethod { get; set; }
        public decimal amount { get; set; }
    }

    public class CreateTransactionDetailsDto
    {
        public TransactionStatus Status { get; set; }
        public DateTime Date { get; set; }
        public string PaymentMethod { get; set; }
        public decimal amount { get; set; }
    }

    // public class UpdateTransactionDetailsDto
    // {
    //     public TransactionStatus Status { get; set; }
    //     public string PaymentMethod { get; set; }
    //     public decimal amount { get; set; }
    // }
}