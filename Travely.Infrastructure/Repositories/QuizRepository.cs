using Microsoft.EntityFrameworkCore;
using Travely.Application.Interfaces;
using Travely.Infrastructure.Data;
using Travely.Infrastructure.Entities;
using Travely.Shared.DTOs;

namespace Travely.Infrastructure.Repositories
{
    public class QuizRepository : IQuizRepository
    {
        private readonly TravelyDbContext _context;

        public QuizRepository(TravelyDbContext context)
        {
            _context = context;
        }

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
                QuestionId = country.Id,
                Capital = country.Capital
            };
        }

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