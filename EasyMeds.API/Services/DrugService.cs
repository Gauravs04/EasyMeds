using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyMeds.API.Data;
using EasyMeds.API.DTOs;
using EasyMeds.API.Services.Interface;
using Microsoft.EntityFrameworkCore;
using API.Models;

namespace EasyMeds.API.Services
{
    public class DrugService : IDrugService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IInventoryService _inventoryService;

        public DrugService(ApplicationDbContext context,IConfiguration configuration,IInventoryService inventoryService){
            _context=context;
            _configuration=configuration;
            _inventoryService=inventoryService;
        }

        public async Task<bool> EditDrug(DrugInventoryDto viewDrugDto){
           var drug=await  _context.Drugs.FindAsync(viewDrugDto.DrugId);
           if(drug==null){
                throw new Exception("No Drug Found");
           }
           drug.Name=viewDrugDto.Name;
           drug.Description=viewDrugDto.Description;
           drug.Price=viewDrugDto.Price;
           drug.DrugExpiry=viewDrugDto.DrugExpiry;
           drug.Stock=viewDrugDto.Stock;
           _context.Drugs.Update(drug);
           await _inventoryService.UpdateInventoryAsync(viewDrugDto);
           await _context.SaveChangesAsync();
           return true;
        }

        public async Task<IEnumerable<ViewDrugDto>> ViewDrugs(){
            var result=await _context.Drugs.ToListAsync();
            var drugdto=result.Select(d=> new ViewDrugDto
                {
                    DrugId=d.DrugId,
                    Name=d.Name,
                    Description=d.Description,
                    Stock=d.Stock,
                    Price=d.Price,
                    DrugExpiry=d.DrugExpiry,
                    CategoryId=d.CategoryId,
                    SupplierId=d.SupplierId,
                    SupplierName =_context.Users.Where(t=>t.Id==d.SupplierId).Select(s=>s.Name).FirstOrDefault()?? "Unknown"
                }
            );

            return drugdto;
        }

        public async Task<DrugInventoryDto> AddDrugs(DrugInventoryDto drugDto){
            var drug=new Drugs{
                DrugId=Guid.NewGuid(),
                Name=drugDto.Name,
                Description=drugDto.Description,
                Stock=drugDto.Stock,
                Price=drugDto.Price,
                DrugExpiry=drugDto.DrugExpiry,
                CategoryId=drugDto.CategoryId,
                SupplierId=drugDto.SupplierId
            };
            await _context.Drugs.AddAsync(drug);
            await _context.SaveChangesAsync();
            // await _inventoryService.CreateInventoryAsync(drugDto,drug);
            return new DrugInventoryDto{
                DrugId=drug.DrugId,
                Name=drug.Name,
                Description=drug.Description,
                Stock=drug.Stock,
                Price=drug.Price,
                DrugExpiry=drug.DrugExpiry,
                CategoryId=drug.CategoryId,
                SupplierId=drug.SupplierId
            };
        }


        public async Task<bool> DeleteDrugs(Guid id){
            var drug=await _context.Drugs.FindAsync(id);
            if(drug==null){
                return false;
            }
            _context.Drugs.Remove(drug);
            // await _inventoryService.DeleteInventoryAsync(id);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}