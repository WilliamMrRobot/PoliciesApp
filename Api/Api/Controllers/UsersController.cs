using Api.Core;
using Api.Core.Dtos;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controllers
{
	[Authorize(Roles = "admin")]
	[EnableCors("http://localhost:4200", "*", "*")]
	public class UsersController : ApiController
	{
		private readonly IUnitOfWork _unitOfWork;

		public UsersController(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
		}

		// GET: api/Policies
		public IEnumerable<User> Get()
		{
			var users = _unitOfWork.Users.GetUsers();
			return users;
		}

		// GET: api/Policies/5
		public User Get(string id)
		{
			var user = _unitOfWork.Users.GetUser(id);
			return user;
		}

		// DELETE: api/Policies/5
		public string Delete(string id)
		{
			var result = _unitOfWork.Users.DeleteUser(id);
			_unitOfWork.Complete();
			return result;
		}
	}
}
