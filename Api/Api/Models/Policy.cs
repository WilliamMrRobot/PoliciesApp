using System;
using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
	public class Policy
	{
		public int Id { get; set; }

		[Required]
		[StringLength(255)]
		public string Name { get; set; }

		[StringLength(500)]
		public string Description { get; set; }
		public DateTime StartValidity { get; set; }
		public int CoverPeriod { get; set; }
		public decimal Price { get; set; }

		[Required]
		public Coverage Coverage { get; set; }

		[Required]
		public Risk Risk { get; set; }
	}
}