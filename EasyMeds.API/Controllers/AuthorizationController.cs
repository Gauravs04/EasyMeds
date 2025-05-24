using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using EasyMeds.API.Data;
using EasyMeds.API.DTOs;
using API.Models;
using EasyMeds.API.Services.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace EasyMeds.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        private readonly IAuthorizationService _authorizationservice;

        private readonly ApplicationDbContext _context;

        public AuthorizationController(UserManager<ApplicationUser> userManager,RoleManager<ApplicationRole> roleManager, IAuthorizationService service,ApplicationDbContext context){
            _userManager=userManager;
            _roleManager=roleManager;
            _authorizationservice=service;
            _context=context;
        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp([FromBody ]SignUpDto signUpDto){
            var mail=await _userManager.FindByEmailAsync(signUpDto.Email);
            if(mail!=null){
                return BadRequest("User already exists");
            }

            var user = new ApplicationUser{
                UserName=signUpDto.Email,
                Name=signUpDto.Name,
                Email=signUpDto.Email,
                PhoneNumber=signUpDto.PhoneNumber,
                Role=signUpDto.Role
            };
            var result =await _userManager.CreateAsync(user,signUpDto.Password);
            if(!result.Succeeded){
                return BadRequest(result.Errors);
            }

            if(! await _roleManager.RoleExistsAsync(signUpDto.Role)){
                await _roleManager.CreateAsync(new ApplicationRole(signUpDto.Role));
            }

            await _userManager.AddToRoleAsync(user,signUpDto.Role);
            return Ok(new {message=$"{signUpDto.Name} has registered successfully"});

        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto){
            var user=await _userManager.FindByEmailAsync(loginDto.Email);
            if(user==null || !await _userManager.CheckPasswordAsync(user,loginDto.Password)){
                return Unauthorized("Invalid Credentials");
            }
           var token=await _authorizationservice.GenerateJwtToken(user);
           return Ok(new {Token=token});
        }


    }
}