using Microsoft.AspNetCore.Identity;
using Travely.Infrastructure.Entities;

namespace Travely.Shared.Entities;

public class ApplicationUser : IdentityUser

{
    public int Points { get; set; }

    public ICollection<UserResult> Results { get; set; }

}
