using System;
using System.Collections.Generic;
using System.Text;

namespace Travely.Shared.DTOs
{
    public class UserResultsDto
    {
        public string Continent { get; set; } = string.Empty;

        public int Correct { get; set; }

        public int Total { get; set; }
    }
}
