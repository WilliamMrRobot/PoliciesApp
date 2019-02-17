using System;

namespace Api.Core.Models
{
	public class Policy
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public DateTime StartValidity { get; set; }
		public int CoverPeriod { get; set; }
		public decimal Price { get; set; }
		public Coverage Coverage { get; set; }
		public byte CoverageId { get; set; }
		public Risk Risk { get; set; }
		public byte RiskId { get; set; }


	}
}