using System.ComponentModel.DataAnnotations;

namespace Vault.Common.Domain;

public abstract class AudibleEntity<T>(T id) : Entity<T>(id), IAggregateRoot where T : IComparable<T>
{
    public DateTime CreatedAt { get; init; } = TimeProvider.System.GetUtcNow().DateTime;

    [ConcurrencyCheck]
    public DateTime ModifiedAt { get; private set; } = TimeProvider.System.GetUtcNow().DateTime;

    void IAggregateRoot.UpdateModifiedAt(DateTime modifiedAt)
    {
        ModifiedAt = modifiedAt;
    }
}