using System;
using System.Collections.Generic;
using System.Text;
using Travely.Shared.DTOs;

namespace Travely.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResultDto> RegisterAsync(RegisterDto dto);
        Task<AuthResultDto> LoginAsync(LoginDto dto);
        Task LogoutAsync();
        Task<bool> DeleteAsync(string userId);
    }
}
