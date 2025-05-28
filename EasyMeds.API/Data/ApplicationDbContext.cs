// using System;
// using Microsoft.EntityFrameworkCore;
// using API.Models;
// using Microsoft.AspNetCore.Identity;

// using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


// namespace EasyMeds.API.Data
// {
//     public class ApplicationDbContext :IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
//     {
//         public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options){ }
//         public DbSet<User> Users{get;set;}
//         public DbSet<Drugs> Drugs{get;set;}
//         public DbSet<Orders> Orders{get;set;}
//         public DbSet<OrderItems> OrderItems{get;set;}
//         public DbSet<TransactionDetails> TransactionDetails{get;set;}
//         public DbSet<Category> Category{get;set;}
//         public DbSet<Inventory> Inventory{get;set;}
//         public DbSet<SalesReport> SalesReport{get;set;}


//         // protected override void OnModelCreating(ModelBuilder modelBuilder)
//         // {
//         //     base.OnModelCreating(modelBuilder);

//         //     modelBuilder.Entity<Inventory>()
//         //         .HasOne(i => i.Drugs)
//         //         .WithMany() // or .WithMany(d => d.Inventory) if you add a navigation property in Drugs
//         //         .HasForeignKey(i => i.DrugId)
//         //         .OnDelete(DeleteBehavior.Cascade); 
//         // }
//     }
    
// }


using System;
using Microsoft.EntityFrameworkCore;
using API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace EasyMeds.API.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        
        public DbSet<Drugs> Drugs { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<OrderItems> OrderItems { get; set; }
        public DbSet<TransactionDetails> TransactionDetails { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Inventory> Inventory { get; set; }
        public DbSet<SalesReport> SalesReport { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure Drugs to Category relationship
            modelBuilder.Entity<Drugs>()
                .HasOne(d => d.Category)
                .WithMany(c => c.Drugs)
                .HasForeignKey(d => d.CategoryId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            // Configure Inventory to Drugs relationship
            modelBuilder.Entity<Inventory>()
                .HasOne(i => i.Drugs)
                .WithMany(d => d.Inventory)
                .HasForeignKey(i => i.DrugId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            // Configure OrderItems relationships
            modelBuilder.Entity<OrderItems>()
                .HasOne(oi => oi.Drugs)
                .WithMany(d => d.OrderItems)
                .HasForeignKey(oi => oi.DrugId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OrderItems>()
                .HasOne(oi => oi.Orders)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            // Configure Orders relationships
            modelBuilder.Entity<Orders>()
                .HasOne(o => o.TransactionDetails)
                .WithMany(td => td.Orders)
                .HasForeignKey(o => o.TransactionId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Orders>()
                .HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Inventory>()
                .HasOne(o => o.User)
                .WithMany(u => u.Inventories)
                .HasForeignKey(o => o.SupplierId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Drugs>()
                .HasMany(d => d.Inventory)
                .WithOne(i => i.Drugs)
                .HasForeignKey(i => i.DrugId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Inventory>()
            .HasOne(i => i.Drugs)
            .WithMany(d => d.Inventory)
            .HasForeignKey(i => i.DrugId)
            .OnDelete(DeleteBehavior.Cascade);


            // Fix the circular reference between Orders and OrderItems
            // Remove the OrderItemId from Orders as it creates a circular reference
            modelBuilder.Entity<Orders>()
                .Ignore(o => o.OrderItemId);

            // Configure SalesReport to Orders relationship (one-to-one)
            modelBuilder.Entity<SalesReport>()
                .HasOne(sr => sr.Order)
                .WithOne(o => o.SalesReport)
                .HasForeignKey<SalesReport>(sr => sr.OrderId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Inventory>()
                .HasOne(o => o.User)
                .WithMany(u => u.Inventories)
                .HasForeignKey(o => o.SupplierId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            
            modelBuilder.Entity<Drugs>()
            .HasOne(d => d.Category)
            .WithMany(c => c.Drugs)
            .HasForeignKey(d => d.CategoryId)
            .OnDelete(DeleteBehavior.Cascade); // or Restrict, SetNull, etc.


            // Ensure table names are singular
            modelBuilder.Entity<Category>().ToTable("Category");
            modelBuilder.Entity<Inventory>().ToTable("Inventory");
            modelBuilder.Entity<SalesReport>().ToTable("SalesReport");
            
            // Avoid conflicts with ASP.NET Identity's Users table
        }
    }
}
