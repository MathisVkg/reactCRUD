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
        public IActionResult GetOders()
        {
            List<Order> orders = _context.Orders.ToList();
            return Ok(orders);
        }
    }

    [ApiController]
    [Route("[controller]")]
    public class CategoryDatabaseController : ControllerBase
    {
        private static readonly string[] RandomCategory = new[]
        {
        "Sandwich", "Plats chauds", "D�jeuner"
        };
        private readonly ILogger<CategoryDatabaseController> _logger;
        
        public CategoryDatabaseController(ILogger<CategoryDatabaseController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetCategoy")]
        public IEnumerable<Category> Get()
        {
            
            return Enumerable.Range(1, 5).Select(index => new Category
            {
                Id = index++,
                Name = RandomCategory[Random.Shared.Next(RandomCategory.Length)]
            })
            .ToArray();
        }
    }


    public class OrderDto: IMapFrom<Order>
    {
        public int Id { get; set; }

        public string Dish { get; set; }

        public string Category { get; set; }

        public string Provider { get; set; }

        public int Price { get; set; }
    }

}