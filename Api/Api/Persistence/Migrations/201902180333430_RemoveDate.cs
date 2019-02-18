namespace Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveDate : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.UserPolicies", "ClientPolicyStartValidity");
        }
        
        public override void Down()
        {
            AddColumn("dbo.UserPolicies", "ClientPolicyStartValidity", c => c.DateTime(nullable: false));
        }
    }
}
