// using System;
// using System.Collections.Generic;
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;
// using System.Linq;
// using System.Threading.Tasks;

// namespace API.Models
// {
//     public class Inventory
//     {
//         [Key]
//         public Guid InventoryId{get;set;}

//         [Required]
//         [ForeignKey("")]
//         public Guid DrugId{get;set;}

//         [Required]
//         public string DrugName{get;set;}

//         [Required]
//         public DateTime DrugExpiry{get;set;}

//         [Required]
//         public long DrugQuantity{get;set;}

//         [Required]
//         public Guid SupplierId{get;set;}
        
//         // [ForeignKey(nameof(DrugId))]
//         // public virtual Drugs Drugs{get;set;}
        
//     }
// }

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Inventory
    {
        [Key]
        public Guid InventoryId { get; set; }

        [Required]
        public Guid DrugId { get; set; }

        [Required]
        public string DrugName { get; set; }

        [Required]
        public DateTime DrugExpiry { get; set; }

        [Required]
        public long DrugQuantity { get; set; }

        [Required]
        public Guid SupplierId { get; set; }
        
        // Navigation property
        [ForeignKey(nameof(DrugId))]
        public virtual Drugs Drugs { get; set; }

        [ForeignKey(nameof(SupplierId))]
        public virtual ApplicationUser User { get; set; }
    }
}
