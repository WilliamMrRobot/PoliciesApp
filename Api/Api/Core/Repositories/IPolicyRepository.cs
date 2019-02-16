using System.Collections.Generic;
using Api.Core.Models;

namespace Api.Core.Repositories
{
	public interface IPolicyRepository
	{
		Policy GetPolicy(int policyId);
		void AddPolicy(Policy policy);
		void UpdatePolicy(int id, Policy policy);
		void DeletePolicy(int id);
		IEnumerable<Policy> GetPolicies();
	}
}