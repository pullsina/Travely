using Travely.Shared.Enums;

namespace Travely.Shared.DTOs
{
    public class LearningCountryDto
    {
        public int QuestionId { get; set; }

        public string Country { get; set; } = string.Empty;

        public string Capital { get; set; } = string.Empty;

        public string Fact { get; set; } = string.Empty;

        public string FlagUrl { get; set; } = string.Empty;

        public string FactUrl { get; set; } = string.Empty;

        public Continent Continent { get; set; }
    }
}
