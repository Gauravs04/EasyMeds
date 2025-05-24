
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using EasyMeds.API.DTOs;

namespace EasyMeds.API.Services.Interface
{
    public interface IInventoryService
    {
        Task<IEnumerable<InventoryDto>> GetAllInventoryAsync();
        Task<InventoryDto> GetInventoryByIdAsync(Guid id);
        Task<IEnumerable<InventoryDto>> GetInventoryByDrugIdAsync(Guid drugId);
        Task<IEnumerable<InventoryDto>> GetInventoryBySupplierIdAsync(Guid supplierId);
        Task<InventoryDto> CreateInventoryAsync(DrugInventoryDto inventoryDto);
        Task<InventoryDto> UpdateInventoryAsync(DrugInventoryDto inventoryDto);
        Task<bool> DeleteInventoryAsync(Guid id);
    }
}