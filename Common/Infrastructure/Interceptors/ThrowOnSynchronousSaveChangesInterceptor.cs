using Microsoft.EntityFrameworkCore.Diagnostics;
using Vault.Common.Domain.Exceptions;

namespace Vault.Common.Infrastructure.Interceptors;

internal sealed class ThrowOnSynchronousSaveChangesInterceptor : SaveChangesInterceptor
{
    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
        => throw new SynchronousSaveChangesForbiddenException();

    private sealed class SynchronousSaveChangesForbiddenException : VaultException;
}
