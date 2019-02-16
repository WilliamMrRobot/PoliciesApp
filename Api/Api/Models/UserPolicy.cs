﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
	public class UserPolicy
	{
		public ApplicationUser Insured { get; set; }
		public Policy Policy { get; set; }
		public DateTime ClientPolicyStartValidity { get; set; }

		[Key]
		[Column(Order = 1)]
		public int PolicyId { get; set; }

		[Key]
		[Column(Order = 2)]
		public string InsuredId { get; set; }
	}
}