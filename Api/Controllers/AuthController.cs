using BookApp.Core.DTOs;
using BookApp.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookApp.Api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController:ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            var result = await _authService.RegisterAsync(model);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto model)
        {
            var result = await _authService.LoginAsync(model);
            if (!result.IsSuccess)
            {
                return Unauthorized(result);
            }

            return Ok(result);
        }
    }
}
