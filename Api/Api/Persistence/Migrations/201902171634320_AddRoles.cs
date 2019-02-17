namespace Api.Migrations
{
	using System.Data.Entity.Migrations;

	public partial class AddRoles : DbMigration
	{
		public override void Up()
		{
			Sql("INSERT INTO AspNetRoles (Id, Name) VALUES (1, 'admin')");
			Sql("INSERT INTO AspNetRoles (Id, Name) VALUES (2, 'client')");
		}

		public override void Down()
		{
			Sql("DELETE FROM AspNetRoles WHERE Id IN (1,2)");
		}
	}
}
