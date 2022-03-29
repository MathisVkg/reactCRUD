using Microsoft.EntityFrameworkCore;

namespace WebAPI.Models
{
    public class DishGestionContext: DbContext
    {
        public DishGestionContext(DbContextOptions<DishGestionContext> options): base(options)
        {

        }

        public DbSet<Orders> Orders { get; set; }
    }
}
