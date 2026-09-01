using Microsoft.EntityFrameworkCore;
using Travely.Application.Interfaces;
using Travely.Infrastructure.Data;
using Travely.Shared.DTOs;
using Travely.Shared.Enums;

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
            int questionId,
            int numberOfOptions)
        {
            // Retrieve a question (Capital?) by its ID
            var question = await _context.Countries
                .FirstOrDefaultAsync(c => c.Id == questionId);

            if (question == null)
            {
                return null;
            }

            // Retrieve answer options (Countries) excluding the correct answer
            var otherCountries = await _context.Countries
                .Where(c => c.Id != questionId)
                .Where(c => c.Continent == question.Continent)
                .OrderBy(c => Guid.NewGuid())
                .Take(numberOfOptions - 1)
                .ToListAsync();

            // Create a list of answer options 
            var answers = otherCountries
                .Select(c => new QuizAnswerDto
                {
                    AnswerId = c.Id,
                    Country = c.Name
                })
                .ToList();


            // Add the correct answer to the list of answer options 
            // Could this method flow risk presenting same country more than once?
            answers.Add(new QuizAnswerDto
            {
                AnswerId = question.Id,
                Country = question.Name
            });

            // Shuffle the answer options 
            answers = answers.OrderBy(_ => Guid.NewGuid()).ToList();


            // Return the quiz question DTO with the question ID, capital, and shuffled answer options
            return new QuizQuestionDto
            {
                QuestionId = question.Id, // UI needs the country ID to identify the question without showing it to the user
                //Question = question.Name,
                Question = question.Capital, // Show the capital to the user instead of the country name
                Answers = answers,
                Difficulty = question.Difficulty,
                // Assign points based on the difficulty level of the question
                Points = question.Difficulty switch
                {
                    Difficulty.Easy => 5,
                    Difficulty.Medium => 7,
                    Difficulty.Hard => 10,
                    _ => 0
                },
                // Assign the continent of the question for potential filtering or categorization
                Continent = question.Continent
            };
        }

        // Method to retrieve a random quiz question based on continent, difficulty, and excluded answered question IDs
        public async Task<QuizQuestionDto?> GetRandomQuestionAsync(
            Continent continent,
            Difficulty difficulty,
            int numberOfOptions,
            List<int> excludedQuestionIds)
        {
            // Retrieve a random question (Capital?) based on the specified continent,
            // difficulty, and excluding certain question IDs
            var question = await _context.Countries
                .Where(c => c.Continent == continent)
                .Where(c => c.Difficulty == difficulty)
                .Where(c => !excludedQuestionIds.Contains(c.Id))
                .OrderBy(c => Guid.NewGuid())
                .FirstOrDefaultAsync();

            if (question == null)
            {
                return null;
            }

            // Retrieve answer options (Countries) excluding the correct answer
            var otherCountries = await _context.Countries
                .Where(c => c.Id != question.Id)
                // Filter by the same continent to ensure answer options are relevant
                .Where(c => c.Continent == continent) 
                .OrderBy(c => Guid.NewGuid())
                .Take(numberOfOptions - 1)
                .ToListAsync();

            // Create a list of answer options (Countries) excluding the correct answer
            var answers = otherCountries
                .Select(c => new QuizAnswerDto
                {
                    AnswerId = c.Id,
                    Country = c.Name
                })
                .ToList();

            // Add the correct answer to the list of answer options
            answers.Add(new QuizAnswerDto
            {
                AnswerId = question.Id,
                Country = question.Name
            });

            // Shuffle the answer options to randomize their order
            answers = answers.OrderBy(_ => Guid.NewGuid()).ToList();

            // Return the quiz question DTO with the question ID, capital, and shuffled answer options
            return new QuizQuestionDto
            {
                QuestionId = question.Id,
                Question = question.Capital,
                Answers = answers,
                Difficulty = question.Difficulty,
                Points = question.Difficulty switch
                {
                    Difficulty.Easy => 5,
                    Difficulty.Medium => 7,
                    Difficulty.Hard => 10,
                    _ => 0
                },
                Continent = question.Continent
            };
        }

        // Method to check if the provided answer ID is correct for a quiz question
        public async Task<bool> IsCorrectAnswerAsync(int questionId, int answerId)
        {
              return questionId == answerId;
        }  
    }
} 