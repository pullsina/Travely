using Travely.Shared.Enums;

namespace Travely.Shared.DTOs
{
    public class CompleteChallengeDto
    {
        public Continent Continent { get; set; }

        public List<SubmitAnswerDto> Answers { get; set; } = new();
    }
}
