using Api.Models;
using System.Collections.Generic;
using System.Linq;

namespace Api.Repositories
{
	public class CoverageRepository : ICoverageRepository
	{
		private readonly ApplicationDbContext _context;

		public CoverageRepository(ApplicationDbContext context)
		{
			_context = context;
		}

		public IEnumerable<Coverage> GetCoverages()
		{
			return _context.Coverages.ToList();
		}
	}
}