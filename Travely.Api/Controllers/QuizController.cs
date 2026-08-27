using Microsoft.AspNetCore.Mvc;
using Travely.Application.Interfaces;
using Travely.Shared.DTOs;

namespace Travely.Api.Controllers
{
    [ApiController]
    [Route("api/quiz")]
    public class QuizController : ControllerBase
    {
        // Dependency injection of the quiz service
        private readonly IQuizService _quizService;

        // Constructor to initialize the controller with the quiz service
        public QuizController(IQuizService quizService)
        {
            _quizService = quizService;
        }

        // Endpoint to retrieve a quiz question by its ID and answer options
        [HttpGet("question/{questionId:int}")]
        public async Task<ActionResult<QuizQuestionDto>> GetQuestion(int questionId)
        {
            // Call the quiz service to get the question
            var question =
                await _quizService.GetQuestionAsync(questionId);

            if (question == null)
            {
                return NotFound();
            }

            return Ok(question);
        }

        // Endpoint to submit an answer for a quiz question
        [HttpPost("answer")]
        public async Task<ActionResult<SubmitAnswerResultDto>> SubmitAnswer([FromBody] SubmitAnswerDto dto)
        {
            // Call the quiz service to submit the answer
            var result =
                await _quizService.SubmitAnswerAsync(dto);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
    }
}