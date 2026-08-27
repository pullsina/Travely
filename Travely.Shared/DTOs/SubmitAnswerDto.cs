namespace Travely.Shared.DTOs
{
    public class SubmitAnswerDto
    {
        // Send in the question ID and the answer option ID to be able to save the user's answer in the database
        public int QuestionId { get; set; }
        public int AnswerId { get; set; } // Selected Country
    }
}
