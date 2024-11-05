using Vault.Common.Domain;

namespace Vault.Common.Tests.Infrastructure;

public class TestAggregateRoot : AggregateRoot<TestId>
{
    public string Data { get; private set; }

    public TestAggregateRoot(TestId id, string data) : base(id)
    {
        Data = data;
    }

    public TestAggregateRoot(string data) : this(TestId.NewId(), data)
    {
    }
}