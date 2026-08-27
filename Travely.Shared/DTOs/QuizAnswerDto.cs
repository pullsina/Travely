namespace Travely.Shared.DTOs
{
    public class QuizAnswerDto
    {
        // Show the answer option with the country's name
        public int AnswerId { get; set; }
        public string Country { get; set; } = string.Empty;
    }
}
