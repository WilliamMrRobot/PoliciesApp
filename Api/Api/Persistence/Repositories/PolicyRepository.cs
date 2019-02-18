﻿using Api.Core.Dtos;
using Api.Core.Models;
using Api.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Api.Persistence.Repositories
{
	public class PolicyRepository : IPolicyRepository
	{
		private readonly ApplicationDbContext _context;

		public PolicyRepository(ApplicationDbContext context)
		{
			_context = context;
		}

		public PolicyDto GetPolicy(int policyId)
		{
			return _context.Policies
				.Include(p => p.Risk.Name)
				.Include(p => p.Coverage.Name).Select(x => new PolicyDto
				{
					Id = x.Id,
					Name = x.Name,
					Description = x.Description,
					StartValidity = x.StartValidity,
					CoverPeriod = x.CoverPeriod,
					Price = x.Price,
					CoverageName = x.Coverage.Name,
					RiskName = x.Risk.Name
				})
				.SingleOrDefault(p => p.Id == policyId);
		}

		private static bool CheckCoveragePercentOver50(Coverage coverage)
		{
			return (coverage != null && coverage.Cover > 50);
		}

		public string AddPolicy(Policy policy)
		{
			try
			{
				var risk = _context.Risks.FirstOrDefault(r => r.Id.Equals(policy.RiskId));
				if (risk != null && risk.Name.ToLower() == "alto")
				{
					var coverage = _context.Coverages.FirstOrDefault(c => c.Id.Equals(policy.CoverageId));
					if (CheckCoveragePercentOver50(coverage)) return "Error, coverage is over 50 percent";
				}
				_context.Policies.Add(policy);
				return "ok";
			}
			catch (Exception)
			{
				return "error";
			};
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

		public string DeletePolicy(int id)
		{
			var currentPolicy = _context.Policies.Find(id);
			if (currentPolicy == null) return "error, policy not found";

			var associated = _context.UserPolicies.Count(x => x.PolicyId.Equals(id));
			if (associated > 0) return "error, this policy is currently associated";

			_context.Entry(currentPolicy).State = EntityState.Deleted;
			return "ok";
		}

		public IEnumerable<PolicyDto> GetPolicies()
		{
			var policies = _context.Policies
				.Include(p => p.Risk)
				.Include(p => p.Coverage).Select(x => new PolicyDto
				{
					Id = x.Id,
					Name = x.Name,
					Description = x.Description,
					StartValidity = x.StartValidity,
					CoverPeriod = x.CoverPeriod,
					Price = x.Price,
					CoverageName = x.Coverage.Name,
					RiskName = x.Risk.Name
				}).ToList();

			return policies;
		}
	}
}