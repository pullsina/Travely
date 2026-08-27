namespace Travely.Shared.DTOs
{
    public class QuizQuestionDto
    {
        // Show the question with a capital
        public int QuestionId { get; set; }
        public string Capital { get; set; } = string.Empty;

        // Define a list for answer options of the type QuizAnswerDto
        public List<QuizAnswerDto> Countries { get; set; } = new();
    }
}
