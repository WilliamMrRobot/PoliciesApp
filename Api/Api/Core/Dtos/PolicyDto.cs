using System;

namespace Api.Core.Dtos
{
	public class PolicyDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public DateTime StartValidity { get; set; }
		public int CoverPeriod { get; set; }
		public decimal Price { get; set; }
		public string CoverageName { get; set; }
		public string RiskName { get; set; }
		public int CoverageId { get; set; }
		public int RiskId { get; set; }
	}
}