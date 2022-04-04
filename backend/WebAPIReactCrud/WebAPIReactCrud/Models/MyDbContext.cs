using Microsoft.EntityFrameworkCore;

namespace WebAPIReactCrud.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {

        }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Provider> Providers { get; set; }

        public DbSet<Category> Categories { get; set; }
    }
}
