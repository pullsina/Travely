using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Travely.Infrastructure.Interfaces;
using Travely.Application.Interfaces;
using Travely.Shared.DTOs;

namespace Travely.Application.Services
{
    public class QuizService : IQuizService
    {
        private readonly IQuizRepository _quizRepo;

        public QuizService(IQuizRepository quizRepo)
        {
            _quizRepo = quizRepo;
        }
        
        public async Task<QuizQuestionDto?> GetQuestionAsync(int questionId)
        {
            var question = await _quizRepo.GetQuestionAsync(questionId);

            if (question == null)
                return null;

            // Mapping the question entity to the QuizQuestionDto
            return new QuizQuestionDto
            {
                QuestionId = question.Id,
                Capital = question.Capital,
                Countries = question.Name
                .Select(a => new QuizAnswerDto
                {
                    Id = a.Id,
                    Answer = a.CountryName
                })
                    .ToList()
            };
        }
        public async Task<SubmitAnswerResultDto?> SubmitAnswerAsync(
            SubmitAnswerDto dto)
        {
            var question = await _quizRepo.GetQuestionAsync(dto.QuestionId);

            if (question == null)
                return null;

            var selectedAnswer = question.Answers
                .FirstOrDefault(a => a.Id == dto.AnswerId);

            if (selectedAnswer == null)
                return null;

            return new SubmitAnswerResultDto
            {
                QuestionId = question.Id,
                IsCorrect = selectedAnswer.IsCorrect,
                CorrectAnswerId = question.Answers
                    .First(a => a.IsCorrect)
                    .Id
            };
        }
    }
}
