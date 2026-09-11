using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Travely.Api.Interfaces;
using Travely.Application.Interfaces;
using Travely.Shared.DTOs;
using Travely.Shared.Entities;

namespace Travely.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase, IAuthController
    {
        private readonly IAuthService _authService;
        private readonly UserManager<ApplicationUser> _userManager; 

        public AuthController(IAuthService authService, UserManager<ApplicationUser> userManager)
        {
            _authService = authService;
            _userManager = userManager; 
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiErrorDto
                {
                    Message = "Invalid registration data."
                });
            }

            var result = await _authService.RegisterAsync(dto);
            if (!result.Success)
            {
                return BadRequest(new ApiErrorDto
                {
                    Message = result.Error ?? "Registration failed."
                });
            }


            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiErrorDto
                {
                    Message = "Invalid login data."
                });
            }


            var result = await _authService.LoginAsync(dto);
            if (!result.Success)
            {
                return Unauthorized(new ApiErrorDto
                {
                    Message = result.Error ?? "Login failed."
                });
            }

            return Ok(result);
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _authService.LogoutAsync();
            return Ok(new
            {
                Message = "You have been logged out."
            });
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized(new ApiErrorDto { Message = "You are not logged in." });
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return NotFound(new ApiErrorDto { Message = "User not found." });
            //var username = User.FindFirst(ClaimTypes.Name)?.Value;
            //var useremail = User.FindFirst(ClaimTypes.Email)?.Value; 

            return Ok(new { userId, username = user.UserName, email = user.Email });
        }

        [Authorize]
        [HttpDelete("delete")]
        public async Task<IActionResult> Delete()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized(new ApiErrorDto
                {
                    Message = "You are not logged in."
                });
            }

            var success = await _authService.DeleteAsync(userId);
            if (!success)
            {
                return BadRequest(new ApiErrorDto
                {
                    Message = "Something went wrong when trying to delete the account."
                });
            }

            await _authService.LogoutAsync();
            return Ok(new
            {
                Message = "Account deleted."
            });
        }
    }
}
