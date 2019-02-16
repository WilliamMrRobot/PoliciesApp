using System.Collections.Generic;
using Api.Models;

namespace Api.Repositories
{
	public interface ICoverageRepository
	{
		IEnumerable<Coverage> GetCoverages();
	}
}