﻿using System;

namespace Api.Core.Dtos
{
	public class UserPolicyResponseDto
	{
		public string Name { get; set; }
		public DateTime StartValidity { get; set; }
		public string CoverageName { get; set; }
		public string RiskName { get; set; }
		public int PolicyId { get; set; }
		public string InsuredId { get; set; }
		public string Description { get; set; }
		public int CoverPeriod { get; set; }
		public decimal Price { get; set; }
	}
}