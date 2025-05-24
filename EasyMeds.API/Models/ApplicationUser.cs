// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using API.Models;
// using Microsoft.AspNetCore.Identity;

// namespace EasyMeds.API.Models
// {
//     public class ApplicationUser : IdentityUser<Guid>
//     {
//         public string Name{get;set;}

//         public string Role{get;set;}

        
//     }

//     public class ApplicationRole : IdentityRole<Guid>
//     {
//         public ApplicationRole() : base() { }

//         public ApplicationRole(string roleName) : base(roleName)
//         {
//             Id = Guid.NewGuid();
//         }
//     }
// }

using System;
using System.Collections.Generic;
using API.Models;
using Microsoft.AspNetCore.Identity;

namespace API.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public ApplicationUser()
        {
            Orders = new HashSet<Orders>();
        }

        public string Name { get; set; }

        public string Role { get; set; }
        
        // Navigation property
        public virtual ICollection<Orders> Orders { get; set; }

        public virtual ICollection<Inventory> Inventories {get;set;}
    }

    public class ApplicationRole : IdentityRole<Guid>
    {
        public ApplicationRole() : base() { }

        public ApplicationRole(string roleName) : base(roleName)
        {
            Id = Guid.NewGuid();
        }
    }
}
