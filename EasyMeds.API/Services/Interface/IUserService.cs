using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EasyMeds.Models.DTO;


namespace API.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto> GetUserByIdAsync(Guid id);
        Task<bool> CreateUserAsync(UserDto userDto);
        Task<bool> UpdateUserAsync(UserDto userDto);
        Task<bool> DeleteUserAsync(Guid id);
        

    }
}