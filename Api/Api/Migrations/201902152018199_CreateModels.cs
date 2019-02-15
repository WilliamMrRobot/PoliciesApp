namespace Api.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateModels : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Coverages",
                c => new
                    {
                        Id = c.Byte(nullable: false),
                        Name = c.String(),
                        Cover = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Policies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        StartValidity = c.DateTime(nullable: false),
                        CoverPeriod = c.Int(nullable: false),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Coverage_Id = c.Byte(),
                        Risk_Id = c.Byte(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Coverages", t => t.Coverage_Id)
                .ForeignKey("dbo.Risks", t => t.Risk_Id)
                .Index(t => t.Coverage_Id)
                .Index(t => t.Risk_Id);
            
            CreateTable(
                "dbo.Risks",
                c => new
                    {
                        Id = c.Byte(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UserPolicies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Policy = c.Int(nullable: false),
                        ClientPolicyStartValidity = c.DateTime(nullable: false),
                        Client_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.Client_Id)
                .Index(t => t.Client_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserPolicies", "Client_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Policies", "Risk_Id", "dbo.Risks");
            DropForeignKey("dbo.Policies", "Coverage_Id", "dbo.Coverages");
            DropIndex("dbo.UserPolicies", new[] { "Client_Id" });
            DropIndex("dbo.Policies", new[] { "Risk_Id" });
            DropIndex("dbo.Policies", new[] { "Coverage_Id" });
            DropTable("dbo.UserPolicies");
            DropTable("dbo.Risks");
            DropTable("dbo.Policies");
            DropTable("dbo.Coverages");
        }
    }
}
