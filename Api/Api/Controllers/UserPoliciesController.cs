using Api.Core;
using Api.Core.Dtos;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controllers
{
	[Authorize(Roles = "admin")]
	[EnableCors("http://localhost:4200", "*", "*")]
	public class UserPoliciesController : ApiController
	{
		private readonly IUnitOfWork _unitOfWork;

		public UserPoliciesController(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
		}

		// GET: api/Policies/5
		public IEnumerable<UserPolicyResponseDto> Get(string id)
		{
			var userpolicies = _unitOfWork.UserPolicies.GetUserPolicies(id);
			return userpolicies;
		}

		// POST: api/Policies
		public string Post([FromBody]UserPolicyDto userpolicy)
		{
			var result = _unitOfWork.UserPolicies.AddUserPolicy(userpolicy);
			_unitOfWork.Complete();
			return result;
		}

		// DELETE: api/Policies/5
		public void Delete(int id)
		{
			_unitOfWork.Policies.DeletePolicy(id);
			_unitOfWork.Complete();
		}
	}
}
