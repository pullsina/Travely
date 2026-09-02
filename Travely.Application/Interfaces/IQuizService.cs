using System;
using System.Collections.Generic;
using System.Text;
using Travely.Shared.DTOs;
using Travely.Shared.Enums;

namespace Travely.Application.Interfaces
{
    public interface IQuizService
    {
        Task<QuizQuestionDto?> GetQuestionAsync(int questionId);

        Task<SubmitAnswerResultDto?> SubmitAnswerAsync(
            SubmitAnswerDto dto);

        // Get a random question based on the specified continent and difficulty, excluding the provided question IDs.
        Task<QuizQuestionDto?> GetRandomQuestionAsync(
            Continent continent,
            Difficulty difficulty,
            List<int> excludedQuestionIds);

        // Get the next question based on the specified continent, excluding the provided question IDs.
        Task<QuizQuestionDto?> GetNextQuestionAsync(
            Continent continent,
            List<int> excludedQuestionIds);

        // Count all quiz questions in the specified continent.
        Task<int> GetQuestionCountAsync(Continent continent);
    }
}
