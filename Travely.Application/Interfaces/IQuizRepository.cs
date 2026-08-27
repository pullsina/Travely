using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Travely.Shared.DTOs;

namespace Travely.Application.Interfaces
{
    public interface IQuizRepository
    {
        // Interfaces use DTOs 
        Task<QuizQuestionDto?> GetQuestionAsync(int questionId);

        Task<List<QuizAnswerDto>> GetAnswerOptionsAsync(
            int correctAnswerId,
            int numberOfOptions);
    }
}
