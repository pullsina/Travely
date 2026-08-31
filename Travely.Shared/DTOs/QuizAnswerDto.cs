namespace Travely.Shared.DTOs
{
    public class QuizAnswerDto
    {
        // The answer ID
        public int AnswerId { get; set; }
        
        // Show the answer option with the country's name
        public string Country { get; set; } = string.Empty;
    }
}
