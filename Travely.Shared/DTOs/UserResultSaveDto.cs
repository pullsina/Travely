using Travely.Shared.Enums;

namespace Travely.Shared.DTOs
{
    public class UserResultSaveDto
    {
        public string UserId { get; set; } = string.Empty;

        public int QuestionId { get; set; }

        public Continent Continent { get; set; }

        public Difficulty Difficulty { get; set; }

        public bool IsCorrect { get; set; }

        public int UsedHintsCount { get; set; }

        public int Score { get; set; }

        public int TotalQuestions { get; set; }
    }
}
