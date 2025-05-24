using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyMeds.API.DTOs;
using EasyMeds.API.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace EasyMeds.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _service;
        public CategoryController(ICategoryService service){
            _service=service;
        }

        [HttpPost("Add-Category")]
        public async Task<IActionResult> AddCategory(CategoryDto categoryDto){
            await _service.AddCategory(categoryDto);
            return Ok(new{message="Category added successfully"});
        }

        [HttpGet("Get-Category")]
        public async Task<IActionResult> GetCategory(){
            var result=await _service.GetCategory();
            return Ok(result);
        }

        [HttpPut("Edit-Category")]
        public async Task<IActionResult> EditCategory(CategoryDto categoryDto,Guid id){
            var result=await _service.EditCategory(categoryDto,id);
            if(result){
                return Ok(new {message=$"Category has been Updated"});
            }
            return BadRequest(new {message=$"Category not found"});
        }  
    }
}