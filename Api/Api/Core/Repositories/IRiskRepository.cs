using System.Collections.Generic;
using Api.Core.Models;

namespace Api.Core.Repositories
{
	public interface IRiskRepository
	{
		IEnumerable<Risk> GetRisks();
	}
}