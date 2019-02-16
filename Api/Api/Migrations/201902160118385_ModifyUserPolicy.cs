namespace Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ModifyUserPolicy : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.UserPolicies", name: "Client_Id", newName: "InsuredId");
            RenameIndex(table: "dbo.UserPolicies", name: "IX_Client_Id", newName: "IX_InsuredId");
            DropPrimaryKey("dbo.UserPolicies");
            AddColumn("dbo.UserPolicies", "PolicyId", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.UserPolicies", new[] { "PolicyId", "InsuredId" });
            CreateIndex("dbo.UserPolicies", "PolicyId");
            AddForeignKey("dbo.UserPolicies", "PolicyId", "dbo.Policies", "Id", cascadeDelete: true);
            DropColumn("dbo.UserPolicies", "Id");
            DropColumn("dbo.UserPolicies", "Policy");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserPolicies", "Policy", c => c.Int(nullable: false));
            AddColumn("dbo.UserPolicies", "Id", c => c.Int(nullable: false, identity: true));
            DropForeignKey("dbo.UserPolicies", "PolicyId", "dbo.Policies");
            DropIndex("dbo.UserPolicies", new[] { "PolicyId" });
            DropPrimaryKey("dbo.UserPolicies");
            DropColumn("dbo.UserPolicies", "PolicyId");
            AddPrimaryKey("dbo.UserPolicies", "Id");
            RenameIndex(table: "dbo.UserPolicies", name: "IX_InsuredId", newName: "IX_Client_Id");
            RenameColumn(table: "dbo.UserPolicies", name: "InsuredId", newName: "Client_Id");
        }
    }
}
