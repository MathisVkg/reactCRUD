using System.ComponentModel.DataAnnotations;

namespace WebAPIReactCrud.Models
{
    public class Provider
    {
        public int Id { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }

        //navigation
        public List<Order> Orders { get; set; }
    }
}
