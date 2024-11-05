using System.Diagnostics;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Vault.Common.Domain.Exceptions;

namespace Vault.Common.Infrastructure.Interceptors;

internal class ThrowOnMultipleSaveChangesInterceptor : SaveChangesInterceptor
{
    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = new())
    {
        var dbContext = eventData.Context as DbContextBase ?? throw new UnreachableException("Database context should not be null.");
        var marker = dbContext.ExecutionContext.Features.Get<Marker>();
        if (marker is not null)
        {
            throw new MultipleSaveChangesInvocationException();
        }

        dbContext.ExecutionContext.Features.Set(new Marker());
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    internal sealed class MultipleSaveChangesInvocationException : VaultException;

    private sealed class Marker;
}
