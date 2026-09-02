using Travely.Shared.DTOs; // Interfaces use DTOs
using Travely.Shared.Enums;

namespace Travely.Application.Interfaces
{
    public interface IQuizRepository
    {
        // Abstraction to method for retrieving a quiz question by its ID and the number of answer options presented with the question
        Task<QuizQuestionDto?> GetQuestionAsync(
            int questionId,
            int numberOfOptions);

        // Abstraction to method for retrieving a random quiz question by continent and difficulty
        Task<QuizQuestionDto?> GetRandomQuestionAsync(
            Continent continent,
            Difficulty difficulty,
            int numberOfOptions,
            List<int> excludedQuestionIds);

        // Abstraction to method for checking if a given answer is correct for a specific question
        Task<bool> IsCorrectAnswerAsync(
            int questionId,
            int answerId);

        // Abstraction to method for retrieving the next quiz question based on the continent,
        // number of options, and a list of excluded question IDs
        Task<QuizQuestionDto?> GetNextQuestionAsync(
            Continent continent,
            int numberOfOptions,
            List<int> excludedQuestionIds);
    }
}