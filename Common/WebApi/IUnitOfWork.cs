namespace Vault.Common.WebApi;

public interface IUnitOfWork
{
    Task Commit(CancellationToken cancellationToken = default);
    bool HasChanges();
}
