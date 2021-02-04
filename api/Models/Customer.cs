using System.Collections.Generic;

namespace api.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string State { get; set; }
        // public ICollection<Order> Order { get; set; }
    }
}