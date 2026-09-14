using Travely.Shared.Enums;

namespace Travely.Shared.DTOs
{
    public class QuizAnswerDto
    {
        // The answer ID
        public int AnswerId { get; set; }

        // Show the answer option with the country's name
        // Old field kept so existing frontend still works
        public string Country { get; set; } = string.Empty;

        // New fields for text or image answers
        public string Text { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
    }
}
