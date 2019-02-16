namespace Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateEntities : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Policies", name: "Coverage_Id", newName: "CoverageId");
            RenameColumn(table: "dbo.Policies", name: "Risk_Id", newName: "RiskId");
            RenameIndex(table: "dbo.Policies", name: "IX_Coverage_Id", newName: "IX_CoverageId");
            RenameIndex(table: "dbo.Policies", name: "IX_Risk_Id", newName: "IX_RiskId");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Policies", name: "IX_RiskId", newName: "IX_Risk_Id");
            RenameIndex(table: "dbo.Policies", name: "IX_CoverageId", newName: "IX_Coverage_Id");
            RenameColumn(table: "dbo.Policies", name: "RiskId", newName: "Risk_Id");
            RenameColumn(table: "dbo.Policies", name: "CoverageId", newName: "Coverage_Id");
        }
    }
}
