using System.Collections.Generic;
using System.Linq;
using Api.Core.Models;
using Api.Core.Repositories;

namespace Api.Persistence.Repositories
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