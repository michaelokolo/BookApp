using AutoMapper;
using BookApp.Api.DTOs;
using BookApp.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BookApp.Core.Models;

namespace BookApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;

        public BookController(IBookRepository bookRepository, IMapper mapper)
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookDto>>> GetBooks()
        {
            var books = await _bookRepository.GetAllBooksAsync();
            return Ok(_mapper.Map<IEnumerable<BookDto>>(books));
        }

        [HttpPost]
        public async Task<ActionResult> CreateBook(BookDto bookDto)
        {
            var book = _mapper.Map<Book>(bookDto);
            await _bookRepository.AddBookAsync(book);
            return CreatedAtAction(nameof(GetBooks), new { id = book.Id }, bookDto);
        }
    }
}
