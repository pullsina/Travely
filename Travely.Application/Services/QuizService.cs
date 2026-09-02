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
            SubmitAnswerDto dto)
        {
            var question = await _quizRepo.GetQuestionAsync(dto.QuestionId, 8);

            if (question == null)
                return null;

            var isCorrect = await _quizRepo.IsCorrectAnswerAsync(dto.QuestionId, dto.AnswerId);

            return new SubmitAnswerResultDto
            {
                QuestionId = question.QuestionId,
                IsCorrect = isCorrect,
                CorrectAnswerId = question.QuestionId,
                // Calculate the score based on whether the answer is correct
                Score = isCorrect ? question.Points : 0 
            };
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

        // Method to count all quiz questions in a continent
        public async Task<int> GetQuestionCountAsync(Continent continent)
        {
            return await _quizRepo.GetQuestionCountAsync(continent);
        }
    }
}
