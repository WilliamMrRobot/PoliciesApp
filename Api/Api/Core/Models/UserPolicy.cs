using System;

namespace Api.Core.Models
{
	public class UserPolicy
	{
		public ApplicationUser Insured { get; set; }

		public Policy Policy { get; set; }

		public DateTime ClientPolicyStartValidity { get; set; }

		public int PolicyId { get; set; }

		public string InsuredId { get; set; }
	}
}