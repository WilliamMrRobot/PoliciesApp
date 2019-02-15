using System;
using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
	public class UserPolicy
	{
		public int Id { get; set; }

		[Required]
		public ApplicationUser Client { get; set; }

		[Required]
		public int Policy { get; set; }
		public DateTime ClientPolicyStartValidity { get; set; }
	}
}