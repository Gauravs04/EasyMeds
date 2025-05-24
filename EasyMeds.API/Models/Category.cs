// using System;
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;

// namespace API.Models
// {
//     public class Category
//     {
//         [Key]
//         public Guid CategoryId{get;set;}

//         [Required]
//         public string CategoryName{get;set;}

        
//     }
// }



using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Category
    {
        public Category()
        {
            Drugs = new HashSet<Drugs>();
        }

        [Key]
        public Guid CategoryId { get; set; }

        [Required]
        public string CategoryName { get; set; }
        
        // Navigation property
        public virtual ICollection<Drugs> Drugs { get; set; }
    }
}
