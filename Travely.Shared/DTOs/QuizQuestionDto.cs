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

        // Show the correct country name
        public string Country { get; set; } = string.Empty;

        // Show fun fact text for the country
        public string Fact { get; set; } = string.Empty;

        // Show flag image URL for the country
        public string FlagUrl { get; set; } = string.Empty;

        // Show fact image URL for the country
        public string FactUrl { get; set; } = string.Empty;

        // Show difficulty with enum
        public Difficulty Difficulty { get; set; }

        // Show points for the question
        public int Points { get; set; }

        public Continent Continent { get; set; }
    }
}
