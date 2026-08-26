using System;
using System.Collections.Generic;
using System.Text;

namespace Travely.Shared.DTOs
{
    public class SubmitAnswerDto
    {
        // Skickar in fråge-id och svarsalternativets id för att kunna spara användarens svar i databasen
        public int QuestionId { get; set; }
        public int AnswerId { get; set; } // Selected Country
    }
}
