// using System;
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;

// namespace API.Models
// {
//     public class OrderItems
//     {
//         [Key]
//         public Guid OrderItemId{get;set;}

//         [Required]
//         public Guid OrderId{get;set;}

//         [Required]
//         public Guid DrugId{get;set;}

//         [Required]
//         public long Quantity{get;set;}

//         // [ForeignKey(nameof(DrugId))]
//         // public virtual Drugs Drugs{get;set;}

//         // [ForeignKey(nameof(OrderId))]
//         // public virtual Orders Orders{get;set;}
//     }
// }

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class OrderItems
    {
        [Key]
        public Guid OrderItemId { get; set; }

        [Required]
        public Guid OrderId { get; set; }

        [Required]
        public Guid DrugId { get; set; }

        [Required]
        public long Quantity { get; set; }

        // Navigation properties
        [ForeignKey(nameof(DrugId))]
        public virtual Drugs Drugs { get; set; }

        [ForeignKey(nameof(OrderId))]
        public virtual Orders Orders { get; set; }
    }
}
