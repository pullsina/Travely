using Microsoft.EntityFrameworkCore;
using Travely.Application.Interfaces;
using Travely.Infrastructure.Data;
using Travely.Infrastructure.Entities;
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
                Country = question.Name,
                Fact = question.Fact,
                FlagUrl = question.FlagUrl,
                FactUrl = question.FactUrl,
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
                Country = question.Name,
                Fact = question.Fact,
                FlagUrl = question.FlagUrl,
                FactUrl = question.FactUrl,
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

        // Method to retrieve the next quiz question based on continent, number of options, and excluded answered question IDs
        public async Task<QuizQuestionDto?> GetNextQuestionAsync(
            Continent continent,
            int numberOfOptions,
            List<int> excludedQuestionIds)
        {
            // Retrieve a random question (Capital?) based on the specified continent,
            var question = await _context.Countries
                .Where(c => c.Continent == continent)
                .Where(c => c.Difficulty == Difficulty.Easy)
                .Where(c => !excludedQuestionIds.Contains(c.Id))
                .OrderBy(c => Guid.NewGuid())
                .FirstOrDefaultAsync();

            // If no easy question is found, try to find a medium difficulty question
            if (question == null)
            {
                question = await _context.Countries
                    .Where(c => c.Continent == continent)
                    .Where(c => c.Difficulty == Difficulty.Medium)
                    .Where(c => !excludedQuestionIds.Contains(c.Id))
                    .OrderBy(c => Guid.NewGuid())
                    .FirstOrDefaultAsync();
            }

            // If no medium question is found, try to find a hard difficulty question
            if (question == null)
            {
                question = await _context.Countries
                    .Where(c => c.Continent == continent)
                    .Where(c => c.Difficulty == Difficulty.Hard)
                    .Where(c => !excludedQuestionIds.Contains(c.Id))
                    .OrderBy(c => Guid.NewGuid())
                    .FirstOrDefaultAsync();
            }

            if (question == null)
            {
                return null;
            }
            // Retrieve answer options (Countries) excluding the correct answer

            var otherCountries = await _context.Countries
                .Where(c => c.Id != question.Id)
                .Where(c => c.Continent == continent)
                .OrderBy(c => Guid.NewGuid())
                .Take(numberOfOptions - 1)
                .ToListAsync();

            var answers = otherCountries
                .Select(c => new QuizAnswerDto
                {
                    AnswerId = c.Id,
                    Country = c.Name
                })
                .ToList();

            answers.Add(new QuizAnswerDto
            {
                AnswerId = question.Id,
                Country = question.Name
            });

            answers = answers.OrderBy(_ => Guid.NewGuid()).ToList();

            return new QuizQuestionDto
            {
                QuestionId = question.Id,
                Question = question.Capital,
                Answers = answers,
                Country = question.Name,
                Fact = question.Fact,
                FlagUrl = question.FlagUrl,
                FactUrl = question.FactUrl,
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

        // Method to count all quiz questions in a continent
        public async Task<int> GetQuestionCountAsync(Continent continent)
        {
            return await _context.Countries
                .CountAsync(c => c.Continent == continent);
        }

        // Method to retrieve saved quiz progress for a user in one continent
        public async Task<QuizProgressDto> GetUserProgressAsync(
            string userId,
            Continent continent)
        {
            var results = await _context.UserResults
                .Where(result => result.UserId == userId)
                .Where(result => result.Continent == continent)
                .ToListAsync();

            var latestResultsByQuestion = results
                .GroupBy(result => result.QuestionId)
                .Select(group => group
                    .OrderByDescending(result => result.CompletedAt)
                    .First())
                .ToList();
            var earnedScore = latestResultsByQuestion.Sum(result => result.Score);
            var usedHintsCount = latestResultsByQuestion.Sum(result => result.UsedHintsCount);
            var answeredQuestionIds = latestResultsByQuestion
                .Select(result => result.QuestionId)
                .ToList();

            return new QuizProgressDto
            {
                CurrentPoints = Math.Max(100 + earnedScore, 0),
                EarnedScore = earnedScore,
                UsedHintsCount = usedHintsCount,
                AnsweredQuestions = answeredQuestionIds.Count,
                CorrectAnswers = latestResultsByQuestion.Count(result => result.IsCorrect),
                WrongAnswers = latestResultsByQuestion.Count(result => !result.IsCorrect),
                AnsweredQuestionIds = answeredQuestionIds
            };
        }

        // Method to retrieve total points for a user across all continents
        public async Task<int> GetUserTotalPointsAsync(string userId)
        {
            var results = await _context.UserResults
                .Where(result => result.UserId == userId)
                .ToListAsync();

            var latestResultsByQuestion = results
                .GroupBy(result => result.QuestionId)
                .Select(group => group
                    .OrderByDescending(result => result.CompletedAt)
                    .First())
                .ToList();

            return Math.Max(
                100 + latestResultsByQuestion.Sum(result => result.Score),
                0);
        }

        // Method to check if the provided answer ID is correct for a quiz question
        public async Task<bool> IsCorrectAnswerAsync(int questionId, int answerId)
        {
              return questionId == answerId;
        }

        // Method to save one submitted answer result for a user
        public async Task SaveUserResultAsync(
            string userId,
            int questionId,
            Continent continent,
            Difficulty difficulty,
            bool isCorrect,
            int usedHintsCount,
            int score,
            int totalQuestions)
        {
            var userResult = new UserResult
            {
                UserId = userId,
                QuestionId = questionId,
                Continent = continent,
                Difficulty = difficulty,
                IsCorrect = isCorrect,
                UsedHintsCount = usedHintsCount,
                Score = score,
                TotalQuestions = totalQuestions,
                CompletedAt = DateTime.UtcNow
            };

            _context.UserResults.Add(userResult);
            await _context.SaveChangesAsync();
        }
    }
} 
