using Api.Core.Dtos;
using Api.Core.Models;
using System.Collections.Generic;

namespace Api.Core.Repositories
{
	public interface IPolicyRepository
	{
		PolicyDto GetPolicy(int policyId);
		string AddPolicy(Policy policy);
		void UpdatePolicy(int id, Policy policy);
		void DeletePolicy(int id);
		IEnumerable<PolicyDto> GetPolicies();
	}
}