using System.ComponentModel.DataAnnotations;

namespace WebAPIReactCrud.Models
{
    public class Order
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string Dish { get; set; }

        [MaxLength(100)]
        public string Category { get; set; }

        [MaxLength(100)]
        public string Provider { get; set; }

        public decimal Price { get; set; }
    }
}
