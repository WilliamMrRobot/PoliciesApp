using Api.Core.Dtos;
using System.Collections.Generic;

namespace Api.Core.Repositories
{
	public interface IUserRepository
	{
		IEnumerable<User> GetUsers();
		User GetUser(string id);
		string DeleteUser(string id);
	}
}
