namespace Core.Models
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
	}
}