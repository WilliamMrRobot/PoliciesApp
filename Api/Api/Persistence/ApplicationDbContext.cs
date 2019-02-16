using Api.Core.Models;
using Api.Persistence.EntityConfigurations;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace Api.Persistence
{
	public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
	{
		public DbSet<Policy> Policies { get; set; }
		public DbSet<Coverage> Coverages { get; set; }
		public DbSet<Risk> Risks { get; set; }
		public DbSet<UserPolicy> UserPolicies { get; set; }

		public ApplicationDbContext()
			: base("DefaultConnection", throwIfV1Schema: false)
		{
		}

		public static ApplicationDbContext Create()
		{
			return new ApplicationDbContext();
		}

		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			modelBuilder.Configurations.Add(new PolicyConfiguration());
			modelBuilder.Configurations.Add(new CoverageConfiguration());
			modelBuilder.Configurations.Add(new RiskConfiguration());
			modelBuilder.Configurations.Add(new UserPolicyConfiguration());

			base.OnModelCreating(modelBuilder);
		}
	}
}