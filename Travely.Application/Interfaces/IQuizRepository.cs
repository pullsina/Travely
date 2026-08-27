using Travely.Shared.DTOs; // Interfaces use DTOs 

namespace Travely.Application.Interfaces
{
    public interface IQuizRepository
    {
        // Abstraction to method for retrieving a quiz question by its ID and the number of answer options presented with the question
        Task<QuizQuestionDto?> GetQuestionAsync(int questionId,
            int numberOfOptions);

        // Abstraction to method for checking if a given answer is correct for a specific question
        Task<bool> IsCorrectAnswerAsync(
            int questionId,
            int answerId);
    }
}
