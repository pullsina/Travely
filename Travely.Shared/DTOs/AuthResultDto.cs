using System;
using System.Collections.Generic;
using System.Text;

namespace Travely.Shared.DTOs
{
    public class AuthResultDto
    {
        public bool Success { get; set;  }
        public string? Error { get; set; }
        public string? UserId { get; set; }
        public string? Username { get; set; }
    }
}
