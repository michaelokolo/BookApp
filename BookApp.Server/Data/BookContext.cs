using Microsoft.EntityFrameworkCore;

namespace BookApp.Server.Data
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions<BookContext> options) : base(options)
        {

        }
        public DbSet<BookApp.Server.Models.Book> Book { get; set; } = default!;
    }
}
