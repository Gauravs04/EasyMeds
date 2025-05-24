// using System;
// using System.Collections.Generic;
// using System.ComponentModel.DataAnnotations;
// using System.Linq;
// using System.Threading.Tasks;

// namespace API.Models
// {
//     public class SalesReport
//     {
//         [Key]
//         public long OrderId{get;set;}

//         [Required]
//         public long OrderDetails{get;set;}

//         [Required]
//         public long TotalSales{get;set;}

        
//     }
// }

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class SalesReport
    {
        [Key]
        public Guid OrderId { get; set; }

        [Required]
        public long OrderDetails { get; set; }

        [Required]
        public long TotalSales { get; set; }
        
        // Navigation property
        [ForeignKey(nameof(OrderId))]
        public virtual Orders Order { get; set; }
    }
}
