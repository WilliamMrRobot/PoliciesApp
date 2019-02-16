using Api.Core.Models;
using System.Data.Entity.ModelConfiguration;

namespace Api.Persistence.EntityConfigurations
{
	public class CoverageConfiguration : EntityTypeConfiguration<Coverage>
	{
		public CoverageConfiguration()
		{
			Property(p => p.Id)
				.IsRequired();

			Property(c => c.Name)
				.IsRequired()
				.HasMaxLength(255);

		}

	}
}