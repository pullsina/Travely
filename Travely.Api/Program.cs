using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Travely.Application.Interfaces;
using Travely.Application.Services;
using Travely.Infrastructure.Data;
using Travely.Infrastructure.Repositories;
using Travely.Infrastructure.Services;
using Travely.Shared.Entities;
using Microsoft.AspNetCore.Authentication.Cookies;
using Travely.Api.Middleware;

var builder = WebApplication.CreateBuilder(args);

//------------------------------------
// Controllers
//------------------------------------
builder.Services.AddControllers();

//------------------------------------
// Database 
//------------------------------------
// Add connection to sql server 
builder.Services.AddDbContext<TravelyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//------------------------------------
// ASP.NET Core Identity
//------------------------------------
builder.Services
    .AddIdentityCore<ApplicationUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<TravelyDbContext>()
    .AddSignInManager();

// Require unique email when creating a user
builder.Services.Configure<IdentityOptions>(options =>
{
    options.User.RequireUniqueEmail = true;
});

//------------------------------------
// Authentication and Authorization
//------------------------------------
//namn på cookie som ska användas
builder.Services.AddAuthentication(IdentityConstants.ApplicationScheme)
    .AddIdentityCookies();
builder.Services.Configure<CookieAuthenticationOptions>(
    IdentityConstants.ApplicationScheme,
    options =>
    {
        options.Cookie.SameSite = SameSiteMode.None;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    });

//------------------------------------
// Application services
//------------------------------------
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IQuizService, QuizService>();

//------------------------------------
// Infrastructrure repositories
//------------------------------------
builder.Services.AddScoped<IQuizRepository, QuizRepository>();
//------------------------------------

//------------------------------------
//for testing endpoints in swagger
//------------------------------------
builder.Services.AddSwaggerGen();

//------------------------------------
// CORS React/Vte
//------------------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()

            .AllowAnyMethod()
            .AllowCredentials();

    });
});

var app = builder.Build();

//------------------------------------
// Test data
//------------------------------------
if (app.Environment.IsDevelopment())
{
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;

        await TestDataSeeder.SeedAsync(services);
    }
}

//------------------------------------
// Middleware
//------------------------------------
app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseCors("ReactApp");

//------------------------------------
// Configure the HTTP request pipeline
//------------------------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
