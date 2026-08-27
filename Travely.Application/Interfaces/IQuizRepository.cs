using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Travely.Shared.DTOs; // Interfaces use DTOs 

namespace Travely.Application.Interfaces
{
    public interface IQuizRepository
    {
        // Abstraction for retrieving a quiz question by its ID
        Task<QuizQuestionDto?> GetQuestionAsync(int questionId);
        
        // Abstraction for retrieving answer options for a quiz question
        Task<List<QuizAnswerDto>> GetAnswerOptionsAsync(
            int correctAnswerId,
            int numberOfOptions);
    }
}
