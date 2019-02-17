using Api.Core;
using Api.Core.Models;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controllers
{
	[Authorize]
	[EnableCors("http://localhost:4200", "*", "*")]
	public class CoveragesController : ApiController
	{
		private readonly IUnitOfWork _unitOfWork;

		public CoveragesController(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
		}
		// GET: api/Coverages
		public IEnumerable<Coverage> Get()
		{
			var coverages = _unitOfWork.Coverages.GetCoverages();
			return coverages;
		}
	}
}
