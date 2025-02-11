using AutoMapper;
using BookApp.Core.Models;
using BookApp.Api.DTOs;


namespace BookApp.Api.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Book, BookDto>().ReverseMap();
        }
    }
}
