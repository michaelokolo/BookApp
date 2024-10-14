using BookApp.Server.Models;
using Microsoft.AspNetCore.Mvc;
using BookApp.Server.Data;
using Microsoft.EntityFrameworkCore;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;




namespace BookApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BooksController : ControllerBase
    {

       

        private readonly BookContext _context;

        private readonly BlobServiceClient _blobServiceClient;

        private readonly string _currentPrincipalId;

        public BooksController(BookContext context, BlobServiceClient blobServiceClient)
        {
            _context = context;
            _blobServiceClient = blobServiceClient;
            _currentPrincipalId = GetCurrentClaimsPrincipal()?.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
            
        }

        private ClaimsPrincipal GetCurrentClaimsPrincipal()
        {
            return User;
        }

        [Authorize(Policy = "WritePolicy")]
        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if(file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            if(file.Length > 204800)// 200 KB
            {
                return BadRequest("File size exceeds the maximum allowed size of 200 KB.");
            }

            var userName = User.Identity?.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return BadRequest("User identity is not available.");
            }

            var containerClient = _blobServiceClient.GetBlobContainerClient(userName);
            await containerClient.CreateIfNotExistsAsync(PublicAccessType.Blob);

            var blobClient = containerClient.GetBlobClient(file.FileName);

            // Upload the file to the blob storage
            using (var stream = file.OpenReadStream())
            {
                await blobClient.UploadAsync(stream, overwrite: true);
            }

            // Return the URL of the uploaded blob
            return Ok(new { url = blobClient.Uri.ToString() });

        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _context.Book.ToListAsync();
            return Ok(books);
        }

        [Authorize(Policy = "WritePolicy")]
        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook(Book book)
        {
            book.UserId = _currentPrincipalId; //Set the UserId to the current user's
            _context.Book.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }

        [AllowAnonymous]
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

        [AllowAnonymous]
        [HttpGet("search/{searchQuery}")]
        public async Task<IActionResult> SearchBook(string searchQuery)
        {
            if (_context.Book == null)
            {
                return Problem("Entity set 'Book' is null.");
            }

            var books = from m in _context.Book
                        select m;
            if (!String.IsNullOrEmpty(searchQuery))
            {
                books = books.Where(s =>
                (s.Title != null && s.Title.ToUpper().Contains(searchQuery.ToUpper())) ||
                (s.Author != null && s.Author.ToUpper().Contains(searchQuery.ToUpper())) ||
                (s.Description != null && s.Description.ToUpper().Contains(searchQuery.ToUpper()))
                );
            }

            var result = await books.ToListAsync();

            return Ok(result);
        }

        [Authorize(Policy = "WritePolicy")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBook(int id)
        {
            var book = await _context.Book.FindAsync(id);
            if(book == null)
            {
                return NotFound();
            }

            if(book.UserId != _currentPrincipalId)
            {
                return Forbid("You are not authorized to delete this book.");
            }
            _context.Book.Remove(book);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Policy = "WritePolicy")]
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

            if (_book.UserId != _currentPrincipalId)
            {
                return Forbid("You are not authorized to update this book.");
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



        [Authorize(Policy = "ReadPolicy")]
        [HttpGet]
        public async Task<IActionResult> GetBooks([FromQuery] string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User ID is required.");
            }

            if (userId != _currentPrincipalId)
            {
                return Forbid("You are not authorized to view these books.");
            }

            var books = await _context.Book.Where(b => b.UserId == userId).ToListAsync();
            return Ok(books);
        }







        

        //userinfo
        [HttpGet("userinfo")]
        public IActionResult GetUserInfo()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userName = User.Identity?.Name;
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;

            return Ok(new
            {
                UserId = userId,
                UserName = userName,
                UserEmail = userEmail
            });
        }



    }
}




