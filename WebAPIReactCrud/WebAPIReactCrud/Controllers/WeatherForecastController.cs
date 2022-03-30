using Microsoft.AspNetCore.Mvc;
using WebAPIReactCrud.Models;

namespace WebAPIReactCrud.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class OrderDatabaseController: ControllerBase
    {
        private readonly ILogger<OrderDatabaseController> _logger;

        public OrderDatabaseController(ILogger<OrderDatabaseController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetDatabase")]
        public IEnumerable<Orders> Get()
        {
            var index = 1;

            return Enumerable.Range(1, 5).Select(index => new Orders
            {
                Id = index++,
                Dish = "Pasta",
                FamilyDish = "Diner",
                Provider = "Lustu",
                Price = 12
            })
            .ToArray();
        }
    }

}