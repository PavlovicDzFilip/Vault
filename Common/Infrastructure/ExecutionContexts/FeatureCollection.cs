namespace Vault.Common.Infrastructure.ExecutionContexts;

internal class FeatureCollection : IFeatureCollection
{
    private readonly Dictionary<Type, object> _features = new();

    public TFeature? Get<TFeature>()
    {
        return _features.TryGetValue(typeof(TFeature), out var feature) ? (TFeature)feature : default;
    }

    public void Set<TFeature>(TFeature? instance)
    {
        if (instance is null)
            _features.Remove(typeof(TFeature));
        else
            _features[typeof(TFeature)] = instance;
    }
}
