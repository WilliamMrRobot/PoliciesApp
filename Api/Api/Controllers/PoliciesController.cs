using Api.Core;
using Api.Core.Dtos;
using Api.Core.Models;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;

namespace Api.Controllers
{
	[Authorize(Roles = "admin")]
	[EnableCorsAttribute("http://localhost:4200", "*", "*")]
	public class PoliciesController : ApiController
	{
		private readonly IUnitOfWork _unitOfWork;

		public PoliciesController(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
		}
		// GET: api/Policies
		public IEnumerable<PolicyDto> Get()
		{
			var policies = _unitOfWork.Policies.GetPolicies();
			return policies;
		}

		// GET: api/Policies/5
		public PolicyDto Get(int id)
		{
			var policy = _unitOfWork.Policies.GetPolicy(id);
			return policy;
		}

		// POST: api/Policies
		public string Post([FromBody]Policy policy)
		{
			var result = _unitOfWork.Policies.AddPolicy(policy);
			_unitOfWork.Complete();
			return result;
		}

		// PUT: api/Policies/5
		public void Put(int id, [FromBody]Policy policy)
		{

			_unitOfWork.Policies.UpdatePolicy(id, policy);
			_unitOfWork.Complete();
		}

		// DELETE: api/Policies/5
		public OkNegotiatedContentResult<string> Delete(int id)
		{
			var result = _unitOfWork.Policies.DeletePolicy(id);
			_unitOfWork.Complete();
			return Ok(result);
		}
	}
}
