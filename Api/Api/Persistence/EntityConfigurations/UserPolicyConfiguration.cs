using Api.Core.Models;
using System.Data.Entity.ModelConfiguration;

namespace Api.Persistence.EntityConfigurations
{
	public class UserPolicyConfiguration : EntityTypeConfiguration<UserPolicy>
	{
		public UserPolicyConfiguration()
		{
			HasKey(a => new { a.PolicyId, a.InsuredId });
		}
	}
}