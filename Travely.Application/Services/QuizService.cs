using Travely.Application.Interfaces; // Uses abstractions in interfaces
using Travely.Shared.DTOs; // Uses DTOs for data transfer between layers
using Travely.Shared.Enums; // Uses enums for continent and difficulty types

namespace Travely.Application.Services
{
    // Service class implementing the IQuizService interface
    public class QuizService : IQuizService
    {
        // Dependency injection of the quiz repository
        private readonly IQuizRepository _quizRepo;

        // Constructor to initialize the service with the quiz repository
        public QuizService(IQuizRepository quizRepo)
        {
            _quizRepo = quizRepo;
        }

        // Method to retrieve a quiz question by its ID and answer options
        public async Task<QuizQuestionDto?> GetQuestionAsync(int questionId)
        {
            // Fetch the question and 8 answer options from the repository 
            var question = await _quizRepo.GetQuestionAsync(questionId, 8);

            // Return null if the question does not exist
            if (question == null)
                return null;

            // Return the question with its answer options
            return question;
        }

        // Method to submit an answer for a quiz question
        public async Task<SubmitAnswerResultDto?> SubmitAnswerAsync(
            SubmitAnswerDto dto,
            string userId)
        {
            var question = await _quizRepo.GetQuestionAsync(dto.QuestionId, 8);

            if (question == null)
                return null;

            var isCorrect = await _quizRepo.IsCorrectAnswerAsync(dto.QuestionId, dto.AnswerId);

            var hintPenalty = Math.Max(dto.UsedHintsCount, 0);
            var finalScore = isCorrect
                ? Math.Max(question.Points - hintPenalty, 0)
                : 0;

            return new SubmitAnswerResultDto
            {
                QuestionId = question.QuestionId,
                IsCorrect = isCorrect,
                CorrectAnswerId = question.QuestionId,
                Score = finalScore
            };
        }

        // Method to save a completed challenge attempt
        public async Task<QuizProgressDto?> CompleteChallengeAsync(
            CompleteChallengeDto dto,
            string userId)
        {
            if (dto.Answers.Count == 0)
                return null;

            var resultsToSave = new List<UserResultSaveDto>();

            foreach (var answer in dto.Answers)
            {
                var question = await _quizRepo.GetQuestionAsync(answer.QuestionId, 8);

                if (question == null || question.Continent != dto.Continent)
                    return null;

                var isCorrect = await _quizRepo.IsCorrectAnswerAsync(
                    answer.QuestionId,
                    answer.AnswerId);

                var hintPenalty = Math.Max(answer.UsedHintsCount, 0);
                var finalScore = isCorrect
                    ? Math.Max(question.Points - hintPenalty, 0)
                    : 0;

                resultsToSave.Add(new UserResultSaveDto
                {
                    UserId = userId,
                    QuestionId = question.QuestionId,
                    Continent = question.Continent,
                    Difficulty = question.Difficulty,
                    IsCorrect = isCorrect,
                    UsedHintsCount = answer.UsedHintsCount,
                    Score = finalScore,
                    TotalQuestions = dto.Answers.Count
                });
            }

            await _quizRepo.SaveUserResultsAsync(resultsToSave);

            return await _quizRepo.GetUserProgressAsync(userId, dto.Continent);
        }

        // Method to retrieve a random quiz question based on continent, difficulty, and excluded question IDs
        public async Task<QuizQuestionDto?> GetRandomQuestionAsync(
            Continent continent,
            Difficulty difficulty,
            List<int> excludedQuestionIds)
        {
            var question = await _quizRepo.GetRandomQuestionAsync(
                continent,
                difficulty,
                8,
                excludedQuestionIds);

            if (question == null)
                return null;

            return question;
        }


        // Method to retrieve the next quiz question based on continent and excluded question IDs
        public async Task<QuizQuestionDto?> GetNextQuestionAsync(
            Continent continent,
            List<int> excludedQuestionIds)
        {
            var question = await _quizRepo.GetNextQuestionAsync(
                continent,
                8,
                excludedQuestionIds);

            if (question == null)
                return null;

            return question;
        }

        // Method to retrieve the next practice question based on continent, practice type, and excluded question IDs
        public async Task<PracticeQuestionDto?> GetNextPracticeQuestionAsync(
            Continent continent,
            QuestionType type,
            List<int> excludedQuestionIds)
        {
            var question = await _quizRepo.GetNextPracticeQuestionAsync(
                continent,
                type,
                8,
                excludedQuestionIds);

            if (question == null)
                return null;

            return question;
        }

        // Method to count all quiz questions in a continent
        public async Task<int> GetQuestionCountAsync(Continent continent)
        {
            return await _quizRepo.GetQuestionCountAsync(continent);
        }

        // Method to retrieve country cards for learning mode
        public async Task<List<LearningCountryDto>> GetLearningCountriesAsync(Continent continent)
        {
            return await _quizRepo.GetLearningCountriesAsync(continent);
        }

        // Method to retrieve saved quiz progress for a user in one continent
        public async Task<QuizProgressDto> GetUserProgressAsync(
            string userId,
            Continent continent)
        {
            return await _quizRepo.GetUserProgressAsync(userId, continent);
        }

        // Method to retrieve total points for a user across all continents
        public async Task<int> GetUserTotalPointsAsync(string userId)
        {
            return await _quizRepo.GetUserTotalPointsAsync(userId);
        }

        // Method to retrieve points split by continent for a user
        public async Task<UserPointsSummaryDto> GetUserPointsSummaryAsync(string userId)
        {
            return await _quizRepo.GetUserPointsSummaryAsync(userId);
        }

        public async Task<List<UserResultsDto>> GetUserResultsAsync(string userId, Continent continent)
        {
            return await _quizRepo.GetUserResultsAsync(userId, continent);
        }
    }
}
