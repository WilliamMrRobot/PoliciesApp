using Api.Core.Dtos;
using Api.Core.Models;
using Api.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Api.Persistence.Repositories
{
	public class UserPolicyRepository : IUserPolicyRepository
	{
		private readonly ApplicationDbContext _context;

		public UserPolicyRepository(ApplicationDbContext context)
		{
			_context = context;
		}

		public IEnumerable<UserPolicyResponseDto> GetUserPolicies(string insuranceId)
		{
			return _context.UserPolicies
				.Include(u => u.Insured)
				.Include(u => u.Policy)
				.Where(u => u.InsuredId == insuranceId)
				.Select(x => new UserPolicyResponseDto
				{
					CoverageName = x.Policy.Coverage.Name,
					InsuredId = x.InsuredId,
					Name = x.Policy.Name,
					PolicyId = x.PolicyId,
					RiskName = x.Policy.Risk.Name,
					StartValidity = x.Policy.StartValidity,
					Description = x.Policy.Description,
					CoverPeriod = x.Policy.CoverPeriod,
					Price = x.Policy.Price

				})
				.ToList();
		}

		public string AddUserPolicy(UserPolicyDto userPolicy)
		{
			try
			{
				foreach (var policy in userPolicy.PolicyIds)
				{
					_context.UserPolicies.Add(new UserPolicy
					{
						PolicyId = policy,
						InsuredId = userPolicy.UserId,
					});
				}

				return "ok";
			}
			catch (Exception)
			{
				return "error";
			};

		}


	}
}