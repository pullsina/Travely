var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
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
