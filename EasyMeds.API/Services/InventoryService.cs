using API.Models;
using EasyMeds.API.Data;
using EasyMeds.API.DTOs;
using EasyMeds.API.Services.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EasyMeds.API.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly ApplicationDbContext _context;

        public InventoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<InventoryDto>> GetAllInventoryAsync()
        {
            var inventories = await _context.Inventory
                .Include(i => i.Drugs)
                .Select(i => new InventoryDto
                {
                    InventoryId = i.InventoryId,
                    DrugId = i.DrugId,
                    DrugName = i.DrugName,
                    DrugExpiry = i.DrugExpiry,
                    DrugQuantity = i.DrugQuantity,
                    SupplierId = i.SupplierId
                })
                .ToListAsync();

            return inventories;
        }

        public async Task<InventoryDto> GetInventoryByIdAsync(Guid id)
        {
            var inventory = await _context.Inventory
                .Include(i => i.Drugs)
                .FirstOrDefaultAsync(i => i.InventoryId == id);

            if (inventory == null)
                return null;

            return new InventoryDto
            {
                InventoryId = inventory.InventoryId,
                DrugId = inventory.DrugId,
                DrugName = inventory.DrugName,
                DrugExpiry = inventory.DrugExpiry,
                DrugQuantity = inventory.DrugQuantity,
                SupplierId = inventory.SupplierId
            };
        }

        public async Task<IEnumerable<InventoryDto>> GetInventoryByDrugIdAsync(Guid drugId)
        {
            var inventories = await _context.Inventory
                .Include(i => i.Drugs)
                .Where(i => i.DrugId == drugId)
                .Select(i => new InventoryDto
                {
                    InventoryId = i.InventoryId,
                    DrugId = i.DrugId,
                    DrugName = i.DrugName,
                    DrugExpiry = i.DrugExpiry,
                    DrugQuantity = i.DrugQuantity,
                    SupplierId = i.SupplierId
                })
                .ToListAsync();

            return inventories;
        }

        public async Task<IEnumerable<InventoryDto>> GetInventoryBySupplierIdAsync(Guid supplierId)
        {
            var inventories = await _context.Inventory
                .Include(i => i.Drugs)
                .Where(i => i.SupplierId == supplierId)
                .Select(i => new InventoryDto
                {
                    InventoryId = i.InventoryId,
                    DrugId = i.DrugId,
                    DrugName = i.DrugName,
                    DrugExpiry = i.DrugExpiry,
                    DrugQuantity = i.DrugQuantity,
                    SupplierId = i.SupplierId
                })
                .ToListAsync();

            return inventories;
        }

        public async Task<InventoryDto> CreateInventoryAsync(DrugInventoryDto inventoryDto)
        {
            // var drug = await _context.Drugs.FindAsync(inventoryDto.DrugId);

            var inventory = new Inventory
            {
                InventoryId=Guid.NewGuid(),
                DrugId = inventoryDto.DrugId,
                DrugName = inventoryDto.Name,
                DrugExpiry = inventoryDto.DrugExpiry,
                DrugQuantity = inventoryDto.Stock,
                SupplierId = inventoryDto.SupplierId
            };

            _context.Inventory.Add(inventory);
            await _context.SaveChangesAsync();

            return new InventoryDto
            {
                InventoryId = inventory.InventoryId,
                DrugId = inventory.DrugId,
                DrugName = inventory.DrugName,
                DrugExpiry = inventory.DrugExpiry,
                DrugQuantity = inventory.DrugQuantity,
                SupplierId = inventory.SupplierId
            };
        }

        public async Task<InventoryDto> UpdateInventoryAsync(DrugInventoryDto inventoryDto)
        {
            var inventory = await _context.Inventory.FirstOrDefaultAsync(s=>s.DrugId==inventoryDto.DrugId);
            if (inventory == null)
                return null;

            var drug = await _context.Drugs.FindAsync(inventoryDto.DrugId);
            if (drug == null)
                throw new Exception($"Drug with ID {inventoryDto.DrugId} not found");

            inventory.DrugId = inventoryDto.DrugId;
            inventory.DrugName = inventoryDto.Name;
            inventory.DrugExpiry = inventoryDto.DrugExpiry;
            inventory.DrugQuantity = inventoryDto.Stock;
            inventory.SupplierId = inventoryDto.SupplierId;

            _context.Inventory.Update(inventory);
            await _context.SaveChangesAsync();

            return new InventoryDto
            {
                InventoryId = inventory.InventoryId,
                DrugId = inventory.DrugId,
                DrugName = inventory.DrugName,
                DrugExpiry = inventory.DrugExpiry,
                DrugQuantity = inventory.DrugQuantity,
                SupplierId = inventory.SupplierId
            };
        }

        public async Task<bool> DeleteInventoryAsync(Guid id)
        {
            var inventory = await _context.Inventory.FindAsync(id);
            if (inventory == null)
                return false;
            _context.Inventory.Remove(inventory);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}