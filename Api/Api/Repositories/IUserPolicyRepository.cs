using Api.Models;
using System.Collections.Generic;

namespace Api.Repositories
{
	public interface IUserPolicyRepository
	{
		IEnumerable<UserPolicy> GetUserPolicies(string insuranceId);
		void AddUserPolicy(UserPolicy userPolicy);
	}
}