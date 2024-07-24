using BookApp.Server.Models;
using Microsoft.AspNetCore.Mvc;

using BookApp.Server.Data;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace BookApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        string loggedInUser = "matt"; // the name matt will eventually be replaced by the logged in user
        private readonly BookContext _context;
        private readonly BlobServiceClient _blobServiceClient;

        public BooksController(BookContext context, BlobServiceClient blobServiceClient )
        {
            _context = context;
            _blobServiceClient = blobServiceClient;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage( IFormFile file)
        {
            if(file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            if (file.Length > 204800) // 200 KB
            {
                return BadRequest("File size exceeds the maximum allowed size of 200 KB.");
            }

            // immediately save to blob storage
            var containerClient = _blobServiceClient.GetBlobContainerClient(loggedInUser);
            await containerClient.CreateIfNotExistsAsync(PublicAccessType.Blob);


            // Get the blob client for the file
            var blobClient = containerClient.GetBlobClient(file.FileName);

            // Upload the file to the blob storage
            using (var stream = file.OpenReadStream())
            {
                await blobClient.UploadAsync(stream, overwrite: true);
            }

            // Return the URL of the uploaded blob
            return Ok(new { url = blobClient.Uri.ToString() });


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

    }
}


