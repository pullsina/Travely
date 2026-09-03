namespace Travely.Shared.DTOs
{
    public class SubmitAnswerDto
    {
        // The question ID responded 
        public int QuestionId { get; set; }

        // The answer ID selected
        public int AnswerId { get; set; } // Selected Country

        // The number of hints used for this question
        public int UsedHintsCount { get; set; }
    }
}
