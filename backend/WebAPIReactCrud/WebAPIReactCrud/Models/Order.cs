using System.ComponentModel.DataAnnotations;

namespace WebAPIReactCrud.Models
{
    public class Order
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }

        public decimal Price { get; set; }

        //navigation
        public int ProviderId { get; set; }
        public Provider Provider { get; set; }
        
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
