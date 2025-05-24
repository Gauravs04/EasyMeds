using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyMeds.API.DTOs;

namespace EasyMeds.API.Services.Interface
{
    public interface IDrugService
    {
        Task<bool> EditDrug(DrugInventoryDto editDrugDto);
        Task<IEnumerable<ViewDrugDto>> ViewDrugs();
        Task<DrugInventoryDto> AddDrugs(DrugInventoryDto drugDto);
        Task<bool> DeleteDrugs(Guid id);
    }
}