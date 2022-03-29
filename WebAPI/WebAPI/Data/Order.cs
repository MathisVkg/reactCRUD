using System.ComponentModel.DataAnnotations;

namespace WebApi.Data
{
    public class Order
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string Dish { get; set; }

        [MaxLength(100)]
        public string FamilyDish { get; set; }

        [MaxLength(100)]
        public string Provider { get; set; }

        public int Price { get; set; }
    }
}
