using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options){}

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Server> Servers { get; set; }

         protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // builder.Entity<Order>()
            //     .HasOne(o => o.Customer)
            //     .WithMany(c => c.Order)
            //     .OnDelete(DeleteBehavior.Restrict);
                
        }


    }
}