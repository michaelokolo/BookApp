namespace BookApp.Api.DTOs
{
    public class BookDto
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime PublishDate { get; set; }
        public decimal Price { get; set; }
    }
}
