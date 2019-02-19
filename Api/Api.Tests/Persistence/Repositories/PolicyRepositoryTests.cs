using Api.Core.Models;
using Api.Core.Repositories;
using Api.Persistence;
using Api.Persistence.Repositories;
using FluentAssertions;
using NUnit.Framework;
using Rhino.Mocks;
using System;
using System.Collections;

namespace Api.Tests.Persistence.Repositories
{
	[TestFixture, DatabaseTest]
	class PolicyRepositoryTests
	{
		[Test]
		public void ShouldAddNewPolicy()
		{
			GivenPolicy();
			ThenAddANewPolicy();
			ThenPolicyResult.Should().BeEquivalentTo("ok");
		}

		[Test]
		public void ShouldFailWhenRiskIsHighAndCoverageIsOverFiftyPercent()
		{
			GivenWrongPolicy();
			ThenAddAWrongNewPolicy();
			ThenPolicyResult.Should().BeEquivalentTo("Error, coverage is over 50 percent");
		}

		[TestCaseSource(typeof(MyDataClass), nameof(MyDataClass.TestCases))]
		public bool ShouldValidateIfTheRiskIsHigh(int risk)
		{
			var riskId = Convert.ToByte(risk);
			return _policyRepositoryMock.CheckIfRiskIsHigh(riskId);
		}

		private void GivenPolicy()
		{
			NewPolicy = new Policy
			{
				CoverageId = 1,
				CoverPeriod = 12,
				Description = "Policy Description Test",
				Name = "Policy Name Test",
				Price = 1500000,
				RiskId = 1,
				StartValidity = DateTime.Now
			};
		}

		private void GivenWrongPolicy()
		{
			WrongPolicy = new Policy
			{

				CoverPeriod = 12,
				Description = "Policy Fail Description Test",
				Name = "Policy Fail Name Test",
				StartValidity = DateTime.Now,
				Price = 1500000,
				CoverageId = 2,
				RiskId = 4

			};
		}
		private void ThenAddANewPolicy()
		{
			ThenPolicyResult = _policyRepositoryMock.AddPolicy(NewPolicy);
		}

		private void ThenAddAWrongNewPolicy()
		{
			ThenPolicyResult = _policyRepositoryMock.AddPolicy(WrongPolicy);
		}


		[SetUp]
		public void Init()
		{
			GivenPolicy();
			GivenWrongPolicy();
			_policyRepository = new PolicyRepository(new ApplicationDbContext());
			_policyRepositoryMock = MockRepository.GenerateMock<IPolicyRepository>();
			_policyRepositoryMock.Stub(x => x.CheckIfRiskIsHigh(1)).Return(false);
			_policyRepositoryMock.Stub(x => x.CheckIfRiskIsHigh(2)).Return(false);
			_policyRepositoryMock.Stub(x => x.CheckIfRiskIsHigh(3)).Return(false);
			_policyRepositoryMock.Stub(x => x.CheckIfRiskIsHigh(4)).Return(true);
			_policyRepositoryMock.Stub(x => x.AddPolicy(NewPolicy)).Return("ok");
			_policyRepositoryMock.Stub(x => x.AddPolicy(WrongPolicy)).Return("Error, coverage is over 50 percent");
		}

		private Policy NewPolicy { get; set; }
		private Policy WrongPolicy { get; set; }
		private PolicyRepository _policyRepository;
		private IPolicyRepository _policyRepositoryMock;
		private string ThenPolicyResult;
	}

	public class MyDataClass
	{
		public static IEnumerable TestCases
		{
			get
			{
				yield return new TestCaseData(1).Returns(false);
				yield return new TestCaseData(2).Returns(false);
				yield return new TestCaseData(3).Returns(false);
				yield return new TestCaseData(4).Returns(true);
			}
		}
	}
}
