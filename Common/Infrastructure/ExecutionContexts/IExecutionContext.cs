namespace Vault.Common.Infrastructure.ExecutionContexts;

public interface IExecutionContext
{
    IFeatureCollection Features { get; }
}
