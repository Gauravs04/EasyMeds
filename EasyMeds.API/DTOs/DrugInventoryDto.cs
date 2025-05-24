using System;

namespace EasyMeds.API.DTOs
{
    public class DrugInventoryDto
    {
        public Guid InventoryId { get; set; }
        public Guid DrugId { get; set; }
        public string Name { get; set; }
        public DateTime DrugExpiry { get; set; }
        public string Description{get;set;}
        public long Stock{get;set;}
        public decimal Price{get;set;}
        public Guid SupplierId { get; set; }
        public Guid CategoryId{get;set;}
    }
}