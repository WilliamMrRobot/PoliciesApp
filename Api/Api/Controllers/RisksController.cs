using Api.Core;
using Api.Core.Models;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controllers
{
	[Authorize]
	[EnableCors("http://localhost:4200", "*", "*")]
	public class RisksController : ApiController
	{
		private readonly IUnitOfWork _unitOfWork;

		public RisksController(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
		}
		// GET: api/Risks
		public IEnumerable<Risk> Get()
		{
			var risks = _unitOfWork.Risks.GetRisks();
			return risks;
		}
	}
}
