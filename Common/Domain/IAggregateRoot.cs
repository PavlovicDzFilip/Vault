namespace Vault.Common.Domain;

public interface IAggregateRoot
{
    DateTime CreatedAt { get; }

    DateTime ModifiedAt { get; }

    void UpdateModifiedAt(DateTime modifiedAt);
}
