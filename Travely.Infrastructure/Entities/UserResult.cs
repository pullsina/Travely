using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Text;
using Travely.Shared.Entities;

namespace Travely.Infrastructure.Entities
{
    public class UserResult
    {
        public int Id { get; set; }

        public int UserId { get; set; }	
        public ApplicationUser User { get; set; }	

        public int Score { get; set; }
        public int TotalQuestions { get; set; }
        public DateTime CompletedAt { get; set; }

    }
}
