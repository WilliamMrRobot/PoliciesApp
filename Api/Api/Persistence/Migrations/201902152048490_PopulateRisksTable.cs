namespace Api.Migrations
{
	using System.Data.Entity.Migrations;

	public partial class PopulateRisksTable : DbMigration
	{
		public override void Up()
		{
			Sql("INSERT INTO Risks (Id, Name) VALUES (1, 'Bajo')");
			Sql("INSERT INTO Risks (Id, Name) VALUES (2, 'Medio')");
			Sql("INSERT INTO Risks (Id, Name) VALUES (3, 'Medio-Alto')");
			Sql("INSERT INTO Risks (Id, Name) VALUES (4, 'Alto')");
		}

		public override void Down()
		{
			Sql("DELETE FROM Risks WHERE Id IN (1,2,3,4)");
		}
	}
}
