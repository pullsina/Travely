using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Travely.Infrastructure.Data;
using Travely.Shared.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Add connection to sql server 
builder.Services.AddDbContext<TravelyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//// configurations for db context - to be implemented
//builder.Services
//    .AddIdentityCore<ApplicationUser>()
//    .AddRoles<IdentityRole>()
//    .AddEntityFrameworkStores<TravelyDbContext>();
//// authentication/authorization - to be implemented 
//builder.Services.AddAuthentication();
//builder.Services.AddAuthorization();


// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>

{

    options.AddPolicy("ReactApp", policy =>

    {

        policy

            .WithOrigins("http://localhost:5173")

            .AllowAnyHeader()

            .AllowAnyMethod();

    });

});

var app = builder.Build();

app.UseCors("ReactApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
