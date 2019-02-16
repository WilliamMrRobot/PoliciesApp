using Api.Core.Models;
using System.Data.Entity.ModelConfiguration;

namespace Api.Persistence.EntityConfigurations
{
	public class PolicyConfiguration : EntityTypeConfiguration<Policy>
	{
		public PolicyConfiguration()
		{
			Property(p => p.Id)
				.IsRequired();

			Property(p => p.Name)
				.IsRequired()
				.HasMaxLength(255);

			Property(p => p.Description)
				.HasMaxLength(500);

			Property(p => p.CoverageId)
				.IsRequired();

			Property(p => p.RiskId)
				.IsRequired();
		}
	}
}