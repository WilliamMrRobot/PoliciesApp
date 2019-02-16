using System.Collections.Generic;
using Api.Core.Models;

namespace Api.Core.Repositories
{
	public interface IUserPolicyRepository
	{
		IEnumerable<UserPolicy> GetUserPolicies(string insuranceId);
		void AddUserPolicy(UserPolicy userPolicy);
	}
}