// using System;
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;

// namespace API.Models
// {
//     public enum TransactionStatus{
//         Pending,
//         Completed
//     }

//     public class TransactionDetails
//     {
//         [Key]
//         public Guid TransactionId{get;set;}

//         [Required]
//         public TransactionStatus Status{get;set;}
        
//         [Required]
//         public DateTime Date{get;set;}

//         [Required]
//         public string PaymentMethod{get;set;}

//         [Required]
//         public decimal amount{get;set;}

        
//     }
// }


using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public enum TransactionStatus
    {
        Pending,
        Completed
    }

    public class TransactionDetails
    {
        public TransactionDetails()
        {
            Orders = new HashSet<Orders>();
        }

        [Key]
        public Guid TransactionId { get; set; }

        [Required]
        public TransactionStatus Status { get; set; }
        
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string PaymentMethod { get; set; }

        [Required]
        public decimal amount { get; set; }
        
        // Navigation property
        public virtual ICollection<Orders> Orders { get; set; }
    }
}
