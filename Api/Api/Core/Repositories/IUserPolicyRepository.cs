using Api.Core.Dtos;
using System.Collections.Generic;

namespace Api.Core.Repositories
{
	public interface IUserPolicyRepository
	{
		IEnumerable<UserPolicyResponseDto> GetUserPolicies(string insuranceId);
		string AddUserPolicy(UserPolicyDto userPolicy);
	}
}