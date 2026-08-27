using System;
using System.Collections.Generic;
using System.Text;

namespace Travely.Shared.DTOs
{
    public class QuizQuestionDto
    {
        // Visa upp fråga med en huvudstad
        public int QuestionId { get; set; }
        public string Capital { get; set; } = string.Empty;

        // Definiera en lista för svarsalternativ av typen QuizAnswerDto
        public List<QuizAnswerDto> Countries { get; set; }
    }
}
