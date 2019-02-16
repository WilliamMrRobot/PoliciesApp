using System.Collections.Generic;
using Api.Core.Models;

namespace Api.Core.Repositories
{
	public interface ICoverageRepository
	{
		IEnumerable<Coverage> GetCoverages();
	}
}