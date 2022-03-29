using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Orders
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string Dish { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string FamilyDish { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string Provider { get; set; }

        public int Price { get; set; }
    }
}
