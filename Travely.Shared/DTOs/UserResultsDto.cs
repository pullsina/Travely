using System;
using System.Collections.Generic;
using System.Text;

namespace Travely.Shared.DTOs
{
    public class UserResultsDto
    {
        public string Continent { get; set; } = string.Empty; // Name of the continent

        public int Correct { get; set; } // Number of correct answers for a continent

        public int Total { get; set; } // Total number of questions answered for a continent

        public int QuestionId { get; set; }

        public string Country { get; set; } = string.Empty;

        public string Capital { get; set; } = string.Empty;

        public bool IsCorrect { get; set; }

        public int UsedHintsCount { get; set; }

        public int Score { get; set; }

        public string Difficulty { get; set; } = string.Empty;
    }
}
