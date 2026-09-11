using Travely.Shared.Enums;

namespace Travely.Shared.DTOs
{
    public class PracticeQuestionDto
    {
        public int QuestionId { get; set; }

        public PracticeQuestionType Type { get; set; }

        public string QuestionText { get; set; } = string.Empty;

        public string QuestionImageUrl { get; set; } = string.Empty;

        public List<PracticeAnswerDto> Answers { get; set; } = new();

        public int CorrectAnswerId { get; set; }

        public string Country { get; set; } = string.Empty;

        public string Capital { get; set; } = string.Empty;

        public string Fact { get; set; } = string.Empty;

        public string FlagUrl { get; set; } = string.Empty;

        public string FactUrl { get; set; } = string.Empty;

        public Continent Continent { get; set; }
    }
}
