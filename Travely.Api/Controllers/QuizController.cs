using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Travely.Application.Interfaces;

namespace Travely.Api.Controllers
{
    [ApiController]
    [Route("api/quiz")]
    public class QuizController : ControllerBase
    {
        private readonly IQuizService _quizService;

        public QuizController(IQuizService quizService)
        {
            _quizService = quizService;
        }

    }
}
//[ApiController]
//[Route("api/[controller]")]
//public class QuizController : ControllerBase
//{
//    private readonly IQuizService _quizService;

//    public QuizController(IQuizService quizService)
//    {
//        _quizService = quizService;
//    }

//    [HttpGet("question/{questionId:int}")]
//    public async Task<ActionResult<QuizQuestionDto>> GetQuestion(
//        int questionId)
//    {
//        var question =
//            await _quizService.GetQuestionAsync(questionId);

//        if (question == null)
//            return NotFound();

//        return Ok(question);
//    }

//    [HttpPost("answer")]
//    public async Task<ActionResult<SubmitAnswerResultDto>> SubmitAnswer(
//        SubmitAnswerDto dto)
//    {
//        var result =
//            await _quizService.SubmitAnswerAsync(dto);

//        if (result == null)
//            return NotFound();

//        return Ok(result);
//    }

//}