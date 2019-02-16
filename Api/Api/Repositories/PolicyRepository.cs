using Api.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Api.Repositories
{
	public class PolicyRepository : IPolicyRepository
	{
		private readonly ApplicationDbContext _context;

		public PolicyRepository(ApplicationDbContext context)
		{
			_context = context;
		}

		public Policy GetPolicy(int policyId)
		{
			return _context.Policies
				.Include(p => p.Risk)
				.Include(p => p.Coverage)
				.SingleOrDefault(p => p.Id == policyId);
		}

		public void AddPolicy(Policy policy)
		{
			_context.Policies.Add(policy);
		}

		public void UpdatePolicy(int id, Policy policy)
		{
			var currentPolicy = _context.Policies.Find(id);
			if (currentPolicy == null)
			{
				return;
			}
			_context.Entry(currentPolicy).CurrentValues.SetValues(policy);
		}

		public void DeletePolicy(int id)
		{
			var currentPolicy = _context.Policies.Find(id);
			if (currentPolicy == null)
			{
				return;
			}
			_context.Entry(currentPolicy).State = EntityState.Deleted;
		}

		public IEnumerable<Policy> GetPolicies()
		{
			return _context.Policies
				.Include(p => p.Risk)
				.Include(p => p.Coverage);
		}
	}
}