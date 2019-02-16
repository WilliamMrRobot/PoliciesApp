using System.Collections.Generic;
using Api.Models;

namespace Api.Repositories
{
	public interface IRiskRepository
	{
		IEnumerable<Risk> GetRisks();
	}
}