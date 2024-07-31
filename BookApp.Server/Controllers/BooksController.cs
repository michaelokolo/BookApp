using BookApp.Server.Models;
using Microsoft.AspNetCore.Mvc;
using BookApp.Server.Data;
using Microsoft.EntityFrameworkCore;



namespace BookApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookContext _context;

        public BooksController(BookContext context )
        {
            _context = context;
            
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _context.Book.ToListAsync();
            return Ok(books);
        }


        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook(Book book)
        {
            _context.Book.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Book.FindAsync(id);

            if(book == null)
            {
                return NotFound();
            }
            return book;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBook(int id)
        {
            var book = await _context.Book.FindAsync(id);
            if(book == null)
            {
                return NotFound();
            }
            _context.Book.Remove(book);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBook(int id, Book book)
        {
            if(id != book.Id)
            {
                return BadRequest("Book ID Mismatch");
            }
            var _book = await _context.Book.FindAsync(id);
            if(_book == null)
            {
                return NotFound();
            }

            _book.Title = book.Title;
            _book.Author = book.Author;
            _book.Description = book.Description;
            _book.Price = book.Price;
            _book.YearPublished = book.YearPublished;

            
            _context.Entry(_book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Book.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
                return Ok(_book);


        }

    }
}


