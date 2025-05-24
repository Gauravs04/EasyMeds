using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace EasyMeds.API.Services.Interface
{
    public interface IAuthorizationService
    {
        Task<string> GenerateJwtToken(ApplicationUser user);
    }
}