using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Vault.Common.Domain;
using Vault.Common.Domain.Exceptions;

namespace Vault.Common.Infrastructure;

[UsedImplicitly(ImplicitUseTargetFlags.WithInheritors)]
public abstract class RepositoryBase<T, TId>(DbContext context)
    where T : AggregateRoot<TId> where TId : IComparable<TId>
{
    protected readonly DbSet<T> DbSet = context.Set<T>();

    public async Task<T> Get(TId id, CancellationToken cancellationToken = default)
    {
        var entity = await GetOrDefault(id, cancellationToken);
        if (entity is null) throw new EntityNotFoundException();

        return entity;
    }

    public async Task<T?> GetOrDefault(TId id, CancellationToken cancellationToken = default)
    {
        var keyValues = new object?[] { id };
        return await DbSet.FindAsync(keyValues, cancellationToken);
    }

    public async Task<bool> Exists(TId id, CancellationToken cancellationToken = default)
    {
        return DbSet.Local.Any(e => e.Id.Equals(id)) || await DbSet.AnyAsync(e => e.Id.Equals(id), cancellationToken);
    }

    public async Task<IReadOnlyCollection<T>> GetAll(CancellationToken cancellationToken = default)
    {
        return await DbSet.ToListAsync(cancellationToken);
    }

    public void Add(T aggregate)
    {
        ArgumentNullException.ThrowIfNull(aggregate);
        DbSet.Add(aggregate);
    }

    public void Update(T aggregate)
    {
        ArgumentNullException.ThrowIfNull(aggregate);
        DbSet.Update(aggregate);
    }

    public void Remove(T aggregate)
    {
        ArgumentNullException.ThrowIfNull(aggregate);
        DbSet.Remove(aggregate);
    }
}

[UsedImplicitly(ImplicitUseTargetFlags.WithInheritors)]
public abstract class RepositoryBase<T>(DbContext context) : RepositoryBase<T, long>(context)
    where T : AggregateRoot<long>
{
}
