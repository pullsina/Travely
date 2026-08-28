using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Travely.Application.Interfaces;
using Travely.Infrastructure.Data;
using Travely.Infrastructure.Services;
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

//Need this for identity-------------:
builder.Services
    .AddIdentityCore<ApplicationUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<TravelyDbContext>()
    .AddSignInManager();
                                 //namn på cookie som ska användas
builder.Services.AddAuthentication(IdentityConstants.ApplicationScheme)
    .AddIdentityCookies();

builder.Services.AddAuthorization();
//------------------------------------

builder.Services.AddScoped<IAuthService, AuthService>();

//not needed since we use our own auth controller and service for register/login/logout
//builder.Services.AddIdentityApiEndpoints<ApplicationUser>().AddEntityFrameworkStores<TravelyDbContext>();

//not needed, using swagger for testing endpoints instead of openapi
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi();

//for testing endpoints in swagger
builder.Services.AddSwaggerGen();

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

app.UseCors("ReactApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
