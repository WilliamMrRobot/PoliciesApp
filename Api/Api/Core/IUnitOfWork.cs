using Api.Core.Repositories;

namespace Api.Core
{
	public interface IUnitOfWork
	{
		IPolicyRepository Policies { get; }
		ICoverageRepository Coverages { get; }
		IRiskRepository Risks { get; }
		IUserPolicyRepository UserPolicies { get; }
		IUserRepository Users { get; }
		void Complete();
	}
}