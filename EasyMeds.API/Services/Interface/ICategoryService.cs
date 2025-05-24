using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using EasyMeds.API.DTOs;

namespace EasyMeds.API.Services.Interface
{
    public interface ICategoryService
    {
        Task<bool> AddCategory(CategoryDto categoryDto);
        Task<IEnumerable<CategoryDto>> GetCategory();
        Task<bool> EditCategory(CategoryDto categoryDto,Guid id);
    }
}