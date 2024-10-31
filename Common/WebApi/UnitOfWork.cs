using Vault.Common.Infrastructure;

namespace Vault.Common.WebApi;

internal class UnitOfWork<TDbContext>(TDbContext dbContext) : IUnitOfWork
    where TDbContext : DbContextBase
{
    public async Task Commit(CancellationToken cancellationToken = default)
    {
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
