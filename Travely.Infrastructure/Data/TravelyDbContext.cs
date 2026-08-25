using System;
using System.Collections.Generic;
using System.Runtime.InteropServices.Marshalling;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Travely.Infrastructure.Entities;
using Travely.Shared.Entities;

namespace Travely.Infrastructure.Data
{
    // Ärver från Identity genom IdentityDbContext med hjälp av entiteten ApplicationUser 
    public class TravelyDbContext : IdentityDbContext<ApplicationUser>
    {
        public TravelyDbContext(DbContextOptions<TravelyDbContext> options) : base(options)
        {
        }
        public DbSet<Country> Countries { get; set; }
        public DbSet<UserResult> UserResults { get; set; }
    }
}
