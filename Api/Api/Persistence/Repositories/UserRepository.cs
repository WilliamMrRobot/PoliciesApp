﻿using Api.Core.Dtos;
using Api.Core.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace Api.Persistence.Repositories
{
	public class UserRepository : IUserRepository
	{
		private readonly ApplicationDbContext _context;

		public UserRepository(ApplicationDbContext context)
		{
			_context = context;
		}

		public IEnumerable<User> GetUsers()
		{
			return _context.Users.Select(u => new User
			{
				Id = u.Id,
				Email = u.Email,
				UserName = u.UserName
			}).ToList();
		}

		public User GetUser(string id)
		{
			var user = _context.Users.FirstOrDefault(u => u.Id == id);
			if (user != null)
				return new User
				{
					Id = user.Id,
					Email = user.Email,
					UserName = user.UserName,
				};
			return null;
		}
	}
}