using Api.Core.Dtos;
using Api.Core.Models;
using System.Collections.Generic;

namespace Api.Core.Repositories
{
	public interface IPolicyRepository
	{
		PolicyDto GetPolicy(int policyId);
		string AddPolicy(Policy policy);
		string UpdatePolicy(int id, Policy policy);
		string DeletePolicy(int id);
		IEnumerable<PolicyDto> GetPolicies();
		bool CheckIfRiskIsHigh(byte riskId);
		bool CheckCoveragePercentOver50(byte coverageId);
	}
}