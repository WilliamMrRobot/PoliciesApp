using Api.Core;
using Api.Core.Repositories;
using Api.Persistence.Repositories;

namespace Api.Persistence
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly ApplicationDbContext _context;
		public IPolicyRepository Policies { get; private set; }
		public ICoverageRepository Coverages { get; private set; }
		public IRiskRepository Risks { get; private set; }
		public IUserPolicyRepository UserPolicies { get; private set; }
		public IUserRepository Users { get; private set; }

		public UnitOfWork(ApplicationDbContext context)
		{
			_context = context;
			Policies = new PolicyRepository(context);
			Coverages = new CoverageRepository(context);
			Risks = new RiskRepository(context);
			UserPolicies = new UserPolicyRepository(context);
			Users = new UserRepository(context);
		}

		public void Complete()
		{
			_context.SaveChanges();
		}
	}
}