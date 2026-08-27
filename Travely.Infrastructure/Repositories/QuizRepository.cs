using Microsoft.EntityFrameworkCore;
using Travely.Application.Interfaces;
using Travely.Infrastructure.Data;
using Travely.Infrastructure.Entities;
using Travely.Shared.DTOs;

namespace Travely.Infrastructure.Repositories
{
    public class QuizRepository : IQuizRepository
    {
        // Dependency injection of the database context
        private readonly TravelyDbContext _context;

        // Constructor to initialize the repository with the database context
        public QuizRepository(TravelyDbContext context)
        {
            _context = context;
        }

        // Method to retrieve a quiz question by its ID
        public async Task<QuizQuestionDto?> GetQuestionAsync(
            int questionId)
        {
            var country = await _context.Countries
                .FirstOrDefaultAsync(c => c.Id == questionId);

            if (country == null)
            {
                return null;
            }

            return new QuizQuestionDto
            {
                QuestionId = country.Id, // UI needs the country ID to identify the question without showing it to the user
                Capital = country.Capital
            };
        }

        // Method to retrieve answer options for a quiz question
        public async Task<List<QuizAnswerDto>> GetAnswerOptionsAsync(
            int correctAnswerId,
            int numberOfOptions)
        {
            var countries = await _context.Countries
                .Where(c => c.Id != correctAnswerId)
                .OrderBy(c => Guid.NewGuid())
                .Take(numberOfOptions - 1)
                .ToListAsync();

            return countries
                .Select(c => new QuizAnswerDto
                {
                    Id = c.Id,
                    Answer = c.Name
                })
                .ToList();
        }
    }
}