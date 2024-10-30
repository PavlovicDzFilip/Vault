namespace Vault.Common.Infrastructure.ExecutionContexts;

public interface IFeatureCollection
{
    TFeature? Get<TFeature>();
    void Set<TFeature>(TFeature? instance);
}