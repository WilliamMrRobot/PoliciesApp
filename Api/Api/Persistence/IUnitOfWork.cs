using Api.Repositories;

namespace Api.Persistence
{
	public interface IUnitOfWork
	{
		IPolicyRepository Policies { get; }
		ICoverageRepository Coverages { get; }
		IRiskRepository Risks { get; }
		IUserPolicyRepository UserPolicies { get; }
		void Complete();
	}
}