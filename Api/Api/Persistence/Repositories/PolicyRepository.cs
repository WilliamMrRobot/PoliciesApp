using Api.Core.Dtos;
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

		public string AddPolicy(Policy policy)
		{
			try
			{
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

		public void DeletePolicy(int id)
		{
			var currentPolicy = _context.Policies.Find(id);
			if (currentPolicy == null)
			{
				return;
			}
			_context.Entry(currentPolicy).State = EntityState.Deleted;
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