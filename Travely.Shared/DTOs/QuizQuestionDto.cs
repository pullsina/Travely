using Travely.Shared.Enums;

namespace Travely.Shared.DTOs
{
    public class QuizQuestionDto
    {
        // The question ID
        public int QuestionId { get; set; }

        // Show the question with a capital
        public string Question { get; set; } = string.Empty;

        // Show the answer options with countries
        public List<QuizAnswerDto> Answers { get; set; } = new();

        // Show difficulty with enum
        public Difficulty Difficulty { get; set; }

        // Show points for the question
        public int Points { get; set; }

        public Continent Continent { get; set; }
    }
}
