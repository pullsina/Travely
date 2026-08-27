namespace Travely.Shared.DTOs
{
    public class SubmitAnswerResultDto
    {
        public bool IsCorrect { get; set; }

        public int QuestionId { get; set; }

        public int CorrectAnswerId { get; set; }

        public int Score { get; set; }
    }
}
