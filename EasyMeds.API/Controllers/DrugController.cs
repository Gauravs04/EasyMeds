using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using EasyMeds.API.DTOs;
using EasyMeds.API.Services;
using EasyMeds.API.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EasyMeds.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DrugController : ControllerBase
    {
        private readonly IDrugService _drugService;

        public DrugController(IDrugService service){
            _drugService=service;
        }

        [Authorize(Roles="Admin,Supplier")]
        [HttpPut("edit-drug")]
        public async Task<IActionResult> EditDrug([FromBody] DrugInventoryDto drugdto){
            try{
                var result=await _drugService.EditDrug(drugdto);
                if(result){
                    return Ok(new{message="Drug updated successfully"});
                }
                return BadRequest("Failed to Update Drug Details");
            }
            catch(Exception ex){
                return NotFound(new {message=ex.Message});
            }
        }

        
        [HttpGet("View-drugs")]
        public async Task<IActionResult> ViewDrugs(){
           var drugs= await _drugService.ViewDrugs();
           return Ok(drugs);
        }

        [Authorize(Roles="Admin,Supplier")]
        [HttpPost("add-drugs")]
        public async Task<IActionResult> AddDrugs([FromBody] DrugInventoryDto drugdto){
          var result =await _drugService.AddDrugs(drugdto);
          return Ok(new{result});
        }

        [Authorize(Roles="Admin,Supplier")]
        [HttpDelete]
        [Route("Delete-Drug/{id}")]
        public async Task<IActionResult> DeleteDrugs(Guid id){
            var result=await _drugService.DeleteDrugs(id);
            if(result){
                return Ok(new {message=$"Drug has been Removed"});
            }
            return BadRequest(new {message=$"Drug not found"});
        }
    }
}