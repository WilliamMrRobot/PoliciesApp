using Api.Models;
using System.Collections.Generic;
using System.Linq;

namespace Api.Repositories
{
	public class UserPolicyRepository : IUserPolicyRepository
	{
		private readonly ApplicationDbContext _context;

		public UserPolicyRepository(ApplicationDbContext context)
		{
			_context = context;
		}

		public IEnumerable<UserPolicy> GetUserPolicies(string insuranceId)
		{
			return _context.UserPolicies
				.Where(u => u.InsuredId == insuranceId)
				.ToList();
		}

		public void AddUserPolicy(UserPolicy userPolicy)
		{
			_context.UserPolicies.Add(userPolicy);
		}


	}
}