using Microsoft.AspNetCore.Mvc;
using Travely.Shared.DTOs;

namespace Travely.Api.Interfaces
{
        public interface IAuthController
        {
            Task<IActionResult> Delete();
            Task<IActionResult> Login(LoginDto dto);
            Task<IActionResult> Logout();
            IActionResult Me();
            Task<IActionResult> Register([FromBody] RegisterDto dto);
        }
}
