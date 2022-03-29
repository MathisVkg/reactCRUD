namespace WebApi.Data
{
    public class Order
    {
        public int Id { get; set; }

        public string Dish { get; set; }

        public string FamilyDish { get; set; }

        public string Provider { get; set; }

        public int Price { get; set; }
    }
}
