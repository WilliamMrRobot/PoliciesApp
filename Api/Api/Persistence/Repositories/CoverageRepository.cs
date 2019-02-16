using System.Collections.Generic;
using System.Linq;
using Api.Core.Models;
using Api.Core.Repositories;

namespace Api.Persistence.Repositories
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