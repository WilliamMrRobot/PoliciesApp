using System.Collections.Generic;
using System.Linq;
using Api.Core.Models;
using Api.Core.Repositories;

namespace Api.Persistence.Repositories
{
	public class RiskRepository : IRiskRepository
	{
		private readonly ApplicationDbContext _context;

		public RiskRepository(ApplicationDbContext context)
		{
			_context = context;
		}

		public IEnumerable<Risk> GetRisks()
		{
			return _context.Risks.ToList();
		}
	}
}