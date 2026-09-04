namespace Travely.Shared.DTOs
{
    public class QuizProgressDto
    {
        public int CurrentPoints { get; set; }
        public int EarnedScore { get; set; }
        public int UsedHintsCount { get; set; }
        public int AnsweredQuestions { get; set; }
        public List<int> AnsweredQuestionIds { get; set; } = new();
        public int CorrectAnswers { get; set; }
        public int WrongAnswers { get; set; }
    }
}
