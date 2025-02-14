﻿using BookApp.Server.Models;
using Microsoft.AspNetCore.Mvc;
using BookApp.Server.Data;
using Microsoft.EntityFrameworkCore;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.Identity.Web.Resource;

namespace BookApp.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookContext _context;
        private readonly BlobServiceClient _blobServiceClient;

        public BooksController(BookContext context, BlobServiceClient blobServiceClient)
        {
            _context = context;
            _blobServiceClient = blobServiceClient;
        }

        private string GetLoggedInUser()
        {
            return User.FindFirstValue(ClaimTypes.Name) ?? "defaultUser";
        }

        [RequiredScope("books.write")]
        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            if (file.Length > 204800) // 200 KB
            {
                return BadRequest("File size exceeds the maximum allowed size of 200 KB.");
            }

            var loggedInUser = GetLoggedInUser();
            var containerClient = _blobServiceClient.GetBlobContainerClient(loggedInUser);
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

        [RequiredScope("books.write")]
        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook(Book book)
        {
            _context.Book.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Book.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }
            return book;
        }

        [RequiredScope("books.read")]
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

        [RequiredScope("books.write")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBook(int id)
        {
            var book = await _context.Book.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }
            _context.Book.Remove(book);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [RequiredScope("books.write")]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBook(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest("Book ID Mismatch");
            }
            var _book = await _context.Book.FindAsync(id);
            if (_book == null)
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