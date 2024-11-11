namespace Vault.Common.Domain.Exceptions;

public class EntityNotFoundException(string id, Type type) : VaultException
{
    public string Id { get; } = id;
    public Type Type { get; } = type;
}
