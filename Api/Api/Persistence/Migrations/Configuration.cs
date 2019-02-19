using Api.Core.Models;
using Api.Persistence;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Api.Migrations
{
	using System.Data.Entity.Migrations;

	internal sealed class Configuration : DbMigrationsConfiguration<ApplicationDbContext>
	{
		public Configuration()
		{
			AutomaticMigrationsEnabled = false;
			MigrationsDirectory = @"Persistence\Migrations";
		}

		protected override void Seed(ApplicationDbContext context)
		{
			//  This method will be called after migrating to the latest version.

			//  You can use the DbSet<T>.AddOrUpdate() helper extension method 
			//  to avoid creating duplicate seed data.
			var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
			var roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));
			string userName = "wil@wil.com";
			string userNameClient = "client@client.com";
			string password = "Pepep.449";

			if (!roleManager.RoleExists("admin"))
			{
				roleManager.Create(new IdentityRole("admin"));
			}
			if (!roleManager.RoleExists("client"))
			{
				roleManager.Create(new IdentityRole("client"));
			}
			ApplicationUser user = userManager.FindByName(userName);
			if (user != null) return;
			user = new ApplicationUser()
			{
				UserName = userName,
				Email = userName,
				EmailConfirmed = true
			};
			var userResult = userManager.Create(user, password);
			if (userResult.Succeeded)
			{
				userManager.AddToRole(user.Id, "admin");
			}

			ApplicationUser client = userManager.FindByName(userNameClient);
			if (client != null) return;
			client = new ApplicationUser()
			{
				UserName = userNameClient,
				Email = userNameClient,
				EmailConfirmed = true
			};
			var clientResult = userManager.Create(client, password);
			if (clientResult.Succeeded)
			{
				userManager.AddToRole(client.Id, "client");
			}
		}
	}
}
