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
    }
}
