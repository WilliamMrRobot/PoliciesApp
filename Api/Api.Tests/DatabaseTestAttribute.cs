using NUnit.Framework;
using NUnit.Framework.Interfaces;
using System.Transactions;
using CategoryAttribute = System.ComponentModel.CategoryAttribute;

namespace Api.Tests
{
	class DatabaseTestAttribute : CategoryAttribute, ITestAction
	{
		private TransactionScope _transaction;

		public ActionTargets Targets => ActionTargets.Test;

		public void BeforeTest(ITest test)
		{
			_transaction = new TransactionScope();
		}

		public void AfterTest(ITest test)
		{
			_transaction.Dispose();
		}
	}
}
