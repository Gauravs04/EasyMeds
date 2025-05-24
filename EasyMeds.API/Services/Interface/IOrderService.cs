using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;

namespace API.Services
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDto>> GetAllOrdersAsync();
        Task<OrderDto> GetOrderByIdAsync(Guid orderId);
        Task<bool> CreateOrderAsync(CreateOrderDto createOrderDto);
        Task<bool> UpdateOrderAsync(Guid orderId, UpdateOrderDto updateOrderDto);
        Task<bool> DeleteOrderAsync(Guid orderId);
    }
}