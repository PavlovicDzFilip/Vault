using System.Diagnostics;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Vault.Common.Domain;

namespace Vault.Common.Infrastructure.Interceptors;

public class AggregateRootInterceptor : SaveChangesInterceptor
{
    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        UpdateAggregateRootModifiedDate(eventData);
        return base.SavingChanges(eventData, result);
    }


    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = new CancellationToken())
    {
        UpdateAggregateRootModifiedDate(eventData);
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    private static void UpdateAggregateRootModifiedDate(DbContextEventData eventData)
    {
        var dbContext = eventData.Context ?? throw new UnreachableException("Database context should not be null.");
        var aggregateRootEntities = dbContext.ChangeTracker.Entries<IAggregateRoot>();
        var now = DateTime.UtcNow;

        foreach (var aggregateRootEntity in aggregateRootEntities)
        {
            aggregateRootEntity.Entity.UpdateModifiedAt(now);
        }
    }
}