using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Travely.Shared.Entities;

namespace Travely.Infrastructure.Data;

//seed for creating a user avaliable for everyone and a user for testing purposes

public static class TestDataSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();

        await CreateUserIfNotExists(
            userManager,
            username: "testUser",
            email: "test@user.com",
            password: "Test123!"
        );

        await CreateUserIfNotExists(
            userManager,
            username: "testLogin",
            email: "test@login.com",
            password: "Test123!"
        );
    }

    private static async Task CreateUserIfNotExists(
        UserManager<ApplicationUser> userManager,
        string username,
        string email,
        string password)
    {
        var existingUser = await userManager.FindByNameAsync(username);

        //does not create user if it already exists
        if (existingUser != null)
        {
            return;
        }

        //if a user with the username does not exist, create it
        var user = new ApplicationUser
        {
            UserName = username,
            Email = email,
            Points = 0
        };

        //create the user with the password
        var result = await userManager.CreateAsync(user, password);

        if (!result.Succeeded)
        {
            var errors = string.Join(
                ", ",
                result.Errors.Select(e => e.Description)
            );

            throw new Exception(
                $"Could not seed test user '{username}': {errors}"
            );
        }
    }
}