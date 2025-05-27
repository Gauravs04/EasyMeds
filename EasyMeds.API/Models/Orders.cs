// using System;
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;


// namespace API.Models
// {
//     public enum OrderStatus{
//         Pending,
//         Verified
//     }
//     public class Orders
//     {
//         [Key]
//         public Guid OrderId{get;set;}

//         [Required]
//         public Guid UserId{get;set;}

//         [Required]
//         public OrderStatus Status{get;set;}
        
//         [Required]
//         public DateTime OrderDate{get;set;}

//         [Required]
//         public decimal TotalAmount{get;set;}

        
//         public Guid? TransactionId{get;set;}

//         [Required]
//         public Guid OrderItemId{get;set;}


//         [ForeignKey(nameof(TransactionId))]
//         public virtual TransactionDetails TransactionDetails{get;set;}

//         [ForeignKey(nameof(OrderItemId))]
//         public virtual OrderItems OrderItems{get;set;}


//         // public virtual SalesReport SalesReport{get;set;}

//         // [ForeignKey(nameof(UserId))]
//         // public virtual ApplicationUser User { get; set; }



//     }
// }


using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models;

namespace API.Models
{
    public enum OrderStatus
    {
        Cancelled,
        Pending,
        Verified
    }
    
    public class Orders
    {
        public Orders()
        {
            OrderItems = new HashSet<OrderItems>();
        }

        [Key]
        public Guid OrderId { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public OrderStatus Status { get; set; }
        
        [Required]
        public DateTime OrderDate { get; set; }

        [Required]
        public decimal TotalAmount { get; set; }

        public Guid? TransactionId { get; set; }

        public Guid? SupplierId{ get; set; }

        // This property creates a circular reference and should be removed
        // It's being ignored in the DbContext configuration
        public Guid OrderItemId { get; set; }

        // Navigation properties
        [ForeignKey(nameof(TransactionId))]
        public virtual TransactionDetails TransactionDetails { get; set; }

        public virtual ICollection<OrderItems> OrderItems { get; set; }

        public virtual SalesReport SalesReport { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual ApplicationUser User { get; set; }
    }
}
