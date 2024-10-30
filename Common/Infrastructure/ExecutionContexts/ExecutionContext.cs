namespace Vault.Common.Infrastructure.ExecutionContexts;

internal class ExecutionContext : IExecutionContext
{
    public IFeatureCollection Features { get; } = new FeatureCollection();
}
