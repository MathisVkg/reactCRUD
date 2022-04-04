using System.Net;
using Microsoft.AspNetCore.Mvc;
using WebAPIReactCrud.Models;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using WebAPIReactCrud.Common.Mappings;

namespace WebAPIReactCrud.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderDatabaseController: ControllerBase
    {
        private readonly MyDbContext _context;

        public OrderDatabaseController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetOrders")]
        public IActionResult GetOrders()
        {
            List<Order> orders = _context.Orders.ToList();
            return Ok(orders);
        }
        
        [HttpPost(Name = "PostOrders")]
        public async Task<ActionResult<OrderDto>> PostProduction(OrderDto orderdto)
        {
            var order = new Order
            {
                Name = orderdto.Name,
                Price = orderdto.Price,
                ProviderId = orderdto.ProviderId,
                CategoryId = orderdto.CategoryId
            };
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetOrders", order);
        }

        [HttpPut(Name = "PutOrder")]
        public async Task<ActionResult<OrderDto>> PutOrder(int id, OrderDto orderdto)
        {
            var order = _context.Orders.FirstOrDefault(e => e.Id == id);
            if (order == null)
            {
                return NotFound();
            }

            order.Name = orderdto.Name;
            order.Price = orderdto.Price;
            order.ProviderId = orderdto.ProviderId;
            order.CategoryId = orderdto.CategoryId;
            
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetOrders", order);
        }
        
        [HttpDelete(Name = "DeleteOrder")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
    
    public class OrderDto: IMapFrom<Order>
    {
        public string Name { get; set; }

        public decimal Price { get; set; }
        
        public int ProviderId { get; set; }
        
        public int CategoryId { get; set; }
    }
    
}