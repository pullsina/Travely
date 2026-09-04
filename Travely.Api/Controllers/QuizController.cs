using Microsoft.AspNetCore.Mvc;
using Travely.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Travely.Shared.DTOs;
using Travely.Shared.Enums;

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
        [Authorize]
        [HttpPost("answer")]
        public async Task<ActionResult<SubmitAnswerResultDto>> SubmitAnswer([FromBody] SubmitAnswerDto dto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized(new ApiErrorDto
                {
                    Message = "You are not logged in."
                });
            }

            // Call the quiz service to submit the answer
            var result =
                await _quizService.SubmitAnswerAsync(dto, userId);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        // Endpoint to retrieve a random quiz question by continent and difficulty
        [HttpGet("question/random")]
        public async Task<ActionResult<QuizQuestionDto>> GetRandomQuestion(
            [FromQuery] Continent continent,
            [FromQuery] Difficulty difficulty,
            [FromQuery] List<int> excludedQuestionIds)
        {
            var question = await _quizService.GetRandomQuestionAsync(
                continent,
                difficulty,
                excludedQuestionIds);

            if (question == null)
            {
                return NotFound();
            }

            return Ok(question);
        }

        // Endpoint to retrieve the next quiz question by continent
        [HttpGet("question/next")]
        public async Task<ActionResult<QuizQuestionDto>> GetNextQuestion(
            [FromQuery] Continent continent,
            [FromQuery] List<int> excludedQuestionIds)
        {
            var question = await _quizService.GetNextQuestionAsync(
                continent,
                excludedQuestionIds);

            if (question == null)
            {
                return NotFound();
            }

            return Ok(question);
        }

        // Endpoint to count all quiz questions in a continent
        [HttpGet("questions/count")]
        public async Task<ActionResult<int>> GetQuestionCount(
            [FromQuery] Continent continent)
        {
            var count = await _quizService.GetQuestionCountAsync(continent);

            return Ok(count);
        }

        // Endpoint to retrieve saved quiz progress for the logged-in user in one continent
        [Authorize]
        [HttpGet("progress")]
        public async Task<ActionResult<QuizProgressDto>> GetProgress(
            [FromQuery] Continent continent)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized(new ApiErrorDto
                {
                    Message = "You are not logged in."
                });
            }

            var progress = await _quizService.GetUserProgressAsync(
                userId,
                continent);

            return Ok(progress);
        }

        // Endpoint to retrieve total points for the logged-in user across all continents
        [Authorize]
        [HttpGet("points")]
        public async Task<ActionResult<UserPointsDto>> GetPoints()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized(new ApiErrorDto
                {
                    Message = "You are not logged in."
                });
            }

            var points = await _quizService.GetUserTotalPointsAsync(userId);

            return Ok(new UserPointsDto
            {
                Points = points
            });
        }

        // Endpoint to retrieve total points and points split by continent for the logged-in user
        [Authorize]
        [HttpGet("points/summary")]
        public async Task<ActionResult<UserPointsSummaryDto>> GetPointsSummary()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized(new ApiErrorDto
                {
                    Message = "You are not logged in."
                });
            }

            var pointsSummary = await _quizService.GetUserPointsSummaryAsync(userId);

            return Ok(pointsSummary);
        }
    }
}
