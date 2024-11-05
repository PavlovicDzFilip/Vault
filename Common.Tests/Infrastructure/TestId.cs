using Vault.Common.Domain;

namespace Vault.Common.Tests.Infrastructure;

public record TestId(long Value) : StronglyTypedId<TestId>(Value)
{
}