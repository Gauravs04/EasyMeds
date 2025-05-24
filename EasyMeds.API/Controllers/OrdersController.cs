using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrder(Guid id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<ActionResult> CreateOrder(CreateOrderDto createOrderDto)
        {
            var order = await _orderService.CreateOrderAsync(createOrderDto);
            return Ok();
        }

        // PUT: api/Orders/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(Guid id, UpdateOrderDto updateOrderDto)
        {
            var order = await _orderService.UpdateOrderAsync(id, updateOrderDto);
            if (order == null)
            {
                return NotFound();
            }
            return Ok();
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            var result = await _orderService.DeleteOrderAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}