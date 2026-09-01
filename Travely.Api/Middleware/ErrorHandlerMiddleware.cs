using System.Net;
using System.Text.Json;
using Travely.Shared.DTOs;

namespace Travely.Api.Middleware
{
 
    // Middleware for handling errors and returning a standardized error response.
    
    public class ErrorHandlerMiddleware
    {
        // The next middleware in the pipeline.
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        // Invokes the middleware to handle errors.
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch
            {
                // Handle the exception and return a standardized error response.
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";

                // Create an ApiErrorDto with a generic error message.
                var response = new ApiErrorDto
                {
                    Message = "Something went wrong."
                };

                var json = JsonSerializer.Serialize(response);

                await context.Response.WriteAsync(json);
            }
        }
    }
}