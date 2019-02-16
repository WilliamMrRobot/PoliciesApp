namespace Api.Migrations
{
	using System.Data.Entity.Migrations;

	public partial class PopulateCoverageTable : DbMigration
	{
		public override void Up()
		{
			Sql("INSERT INTO Coverages (Id, Name, Cover) VALUES (1, 'Terremoto', 70)");
			Sql("INSERT INTO Coverages (Id, Name, Cover) VALUES (2, 'Incendio', 80)");
			Sql("INSERT INTO Coverages (Id, Name, Cover) VALUES (3, 'Robo', 45)");
			Sql("INSERT INTO Coverages (Id, Name, Cover) VALUES (4, 'Pérdida', 40)");
		}

		public override void Down()
		{
			Sql("DELETE FROM Coverages WHERE Id IN (1,2,3,4)");
		}
	}
}
