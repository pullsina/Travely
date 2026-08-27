using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using Travely.Application.Interfaces;
using Travely.Shared.DTOs;
using Travely.Shared.Entities;

namespace Travely.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        public async Task<AuthResultDto> RegisterAsync(RegisterDto dto)
        {
            //WHEN TESTING REGISTER ENDPOINT MAKE SURE TO FOLLOW IDENTITY'S PASSWORD RULES:
            //Password must be at least 6 characters long
            //Password must contain at least one uppercase letter
            //Password must contain at least one lowercase letter
            //Password must contain at least one digit
            //Password must contain at least one non-alphanumeric character

            //ensure passwords match
            if (dto.Password != dto.ConfirmPassword)
            {
                return new AuthResultDto
                {
                    Success = false,
                    Error = "Passwords do not match."
                };
            }

            //ensure username does not already exist
            var existingUser = await _userManager.FindByNameAsync(dto.Username);

            if (existingUser != null)
            {
                return new AuthResultDto
                {
                    Success = false,
                    Error = "Username is already taken."
                };
            }

            var user = new ApplicationUser
            {
                UserName = dto.Username,
                Points = 0
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                return new AuthResultDto
                {
                    Success = false,
                    Error = "Something went wrong trying to register."
                };
            }

            //login if success
            await _signInManager.SignInAsync(user, isPersistent: false);

            return new AuthResultDto
            {
                Success = true,
                UserId = user.Id,
                Username = user.UserName
            };
        }

        public async Task<AuthResultDto> LoginAsync(LoginDto dto)
        {
            var user = await _userManager.FindByNameAsync(dto.Username);

            //if user is null return error
            if (user == null)
            {
                return new AuthResultDto
                {
                    Success = false,
                    Error = "Invalid username or password."
                };
            }

            //if user exists, check password
            var passwordValid = await _userManager.CheckPasswordAsync(user, dto.Password);

            if (!passwordValid)
            {
                return new AuthResultDto
                {
                    Success = false,
                    Error = "Invalid username or password."
                };
            }

            //if ok, create cookie and login user
            await _signInManager.SignInAsync(user, isPersistent: false);

            return new AuthResultDto
            {
                Success = true,
                UserId = user.Id,
                Username = user.UserName
            };
        }

        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        public Task<bool> DeleteAsync(string userId)
        {
            throw new NotImplementedException();
        }

    }
}
