using Api.Models;
using System.Collections.Generic;
using System.Linq;

namespace Api.Repositories
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