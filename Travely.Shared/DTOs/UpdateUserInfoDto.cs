using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Travely.Shared.DTOs
{
    public class UpdateUserInfoDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        // Nice to have:
        // Add a property for the current password to verify the user's identity before allowing updates
        // public string CurrentPassword { get; set; }
    }
}
