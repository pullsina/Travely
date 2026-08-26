using System;
using System.Collections.Generic;
using System.Text;
using Travely.Shared.DTOs;

namespace Travely.Application.Interfaces
{
    public interface IQuizService
    {
        Task<QuizQuestionDto?> GetQuestionAsync(int questionId);

        Task<SubmitAnswerResultDto?> SubmitAnswerAsync(
            SubmitAnswerDto dto);
    }
}
