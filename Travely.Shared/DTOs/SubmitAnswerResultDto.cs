namespace Travely.Shared.DTOs
{
    public class SubmitAnswerResultDto
    {
        // Indicate correct or incorrect answer
        public bool IsCorrect { get; set; }
        
        // The question ID responded
        public int QuestionId { get; set; }

        // The correct answer ID
        public int CorrectAnswerId { get; set; }

        // The score for the answered question
        public int Score { get; set; }
    }
}
