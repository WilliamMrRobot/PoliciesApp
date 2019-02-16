namespace Core.Models
{
	public class Coverage
	{
		public byte Id { get; set; }

		[Required]
		[StringLength(255)]
		public string Name { get; set; }
		public int Cover { get; set; }
	}
}