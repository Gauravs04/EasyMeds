// using System;
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;

// namespace API.Models
// {
//     public class Drugs
//     {
//         [Key]
//         public Guid DrugId{get;set;}

//         [Required]
//         public Guid SupplierId{get;set;}

//         [Required]
//         public string Name{get;set;}

//         [Required]

//         public string Description{get;set;}

//         [Required]
//         public long Stock{get;set;}

//         [Required]
//         public decimal Price{get;set;}

//         [Required]
//         public Guid CategoryId{get;set;}

//         // public ICollection<OrderItems> OrderItems { get; set; }

        

//         // [ForeignKey(nameof(CategoryId))]
//         // public virtual Category Category { get; set; }
//     }

// }


using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Drugs
    {
        public Drugs()
        {
            OrderItems = new HashSet<OrderItems>();
            Inventory = new HashSet<Inventory>();
        }

        [Key]
        public Guid DrugId { get; set; }

        [Required]
        public Guid SupplierId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public long Stock { get; set; }

        [Required]
        public DateTime DrugExpiry{get;set;}

        [Required]
        public decimal Price { get; set; }

        [Required]
        public Guid CategoryId { get; set; }

        // Navigation properties
        public virtual ICollection<OrderItems> OrderItems { get; set; }
        public virtual ICollection<Inventory> Inventory { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public virtual Category? Category { get; set; }
    }
}
