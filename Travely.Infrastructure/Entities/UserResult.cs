using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Text;
using Travely.Shared.Entities;
using Travely.Shared.Enums;

namespace Travely.Infrastructure.Entities
{
    public class UserResult
    {
        public int Id { get; set; }

        public string UserId { get; set; } = string.Empty;
        public ApplicationUser User { get; set; } = null!;

        public int QuestionId { get; set; }
        public Continent Continent { get; set; }
        public Difficulty Difficulty { get; set; }
        public bool IsCorrect { get; set; }
        public int UsedHintsCount { get; set; }

        public int Score { get; set; }
        public int TotalQuestions { get; set; }
        public DateTime CompletedAt { get; set; }
    }
}
