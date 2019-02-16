namespace Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class OverrideConventions : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Policies", "Coverage_Id", "dbo.Coverages");
            DropForeignKey("dbo.Policies", "Risk_Id", "dbo.Risks");
            DropForeignKey("dbo.UserPolicies", "Client_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Policies", new[] { "Coverage_Id" });
            DropIndex("dbo.Policies", new[] { "Risk_Id" });
            DropIndex("dbo.UserPolicies", new[] { "Client_Id" });
            AlterColumn("dbo.Coverages", "Name", c => c.String(nullable: false, maxLength: 255));
            AlterColumn("dbo.Policies", "Name", c => c.String(nullable: false, maxLength: 255));
            AlterColumn("dbo.Policies", "Description", c => c.String(maxLength: 500));
            AlterColumn("dbo.Policies", "Coverage_Id", c => c.Byte(nullable: false));
            AlterColumn("dbo.Policies", "Risk_Id", c => c.Byte(nullable: false));
            AlterColumn("dbo.Risks", "Name", c => c.String(nullable: false, maxLength: 255));
            AlterColumn("dbo.UserPolicies", "Client_Id", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.Policies", "Coverage_Id");
            CreateIndex("dbo.Policies", "Risk_Id");
            CreateIndex("dbo.UserPolicies", "Client_Id");
            AddForeignKey("dbo.Policies", "Coverage_Id", "dbo.Coverages", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Policies", "Risk_Id", "dbo.Risks", "Id", cascadeDelete: true);
            AddForeignKey("dbo.UserPolicies", "Client_Id", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserPolicies", "Client_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Policies", "Risk_Id", "dbo.Risks");
            DropForeignKey("dbo.Policies", "Coverage_Id", "dbo.Coverages");
            DropIndex("dbo.UserPolicies", new[] { "Client_Id" });
            DropIndex("dbo.Policies", new[] { "Risk_Id" });
            DropIndex("dbo.Policies", new[] { "Coverage_Id" });
            AlterColumn("dbo.UserPolicies", "Client_Id", c => c.String(maxLength: 128));
            AlterColumn("dbo.Risks", "Name", c => c.String());
            AlterColumn("dbo.Policies", "Risk_Id", c => c.Byte());
            AlterColumn("dbo.Policies", "Coverage_Id", c => c.Byte());
            AlterColumn("dbo.Policies", "Description", c => c.String());
            AlterColumn("dbo.Policies", "Name", c => c.String());
            AlterColumn("dbo.Coverages", "Name", c => c.String());
            CreateIndex("dbo.UserPolicies", "Client_Id");
            CreateIndex("dbo.Policies", "Risk_Id");
            CreateIndex("dbo.Policies", "Coverage_Id");
            AddForeignKey("dbo.UserPolicies", "Client_Id", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.Policies", "Risk_Id", "dbo.Risks", "Id");
            AddForeignKey("dbo.Policies", "Coverage_Id", "dbo.Coverages", "Id");
        }
    }
}
