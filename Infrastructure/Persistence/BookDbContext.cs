using BookApp.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace BookApp.Infrastructure.Persistence
{
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options): base(options)
        {

        }

        // Define the Books DbSet
        public DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Fluent API configurations if needed
            modelBuilder.Entity<Book>().HasKey(b => b.Id);
            modelBuilder.Entity<Book>().Property(b => b.Title).IsRequired().HasMaxLength(200);
            modelBuilder.Entity<Book>().Property(b => b.Author).IsRequired().HasMaxLength(200);
        }
    }
}