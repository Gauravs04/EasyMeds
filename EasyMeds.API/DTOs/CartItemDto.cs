using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyMeds.API.DTOs
{
    public class CartItemDto
    {
        public Guid DrugId { get; set; }
        public int Quantity { get; set; }
        public Guid SupplierId{ get; set; }
    }
}