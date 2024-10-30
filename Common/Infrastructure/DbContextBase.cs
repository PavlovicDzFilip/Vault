using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Vault.Common.Domain;
using Vault.Common.Infrastructure.ExecutionContexts;
using Vault.Common.Infrastructure.Interceptors;

namespace Vault.Common.Infrastructure;

public abstract class DbContextBase(DbContextOptions options, IExecutionContext executionContext) :
    DbContext(options)
{
    public IExecutionContext ExecutionContext { get; } = executionContext;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.AddInterceptors(new UpdateAggregateRootInterceptor());
        optionsBuilder.AddInterceptors(new ThrowOnMultipleSaveChangesInterceptor());
        optionsBuilder.AddInterceptors(new ThrowOnSynchronousSaveChangesInterceptor());
        optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                var baseType = property.ClrType.BaseType;
                while (baseType != null)
                {
                    if (baseType.IsGenericType && baseType.GetGenericTypeDefinition() == typeof(SingleValueObject<,>))
                    {
                        var genericArguments = baseType.GetGenericArguments();
                        var converterType = typeof(SingleValueObjectConverter<,>).MakeGenericType(genericArguments);
                        var converterInstance = (ValueConverter)Activator.CreateInstance(converterType)!;
                        modelBuilder.Entity(entityType.ClrType)
                            .Property(property.Name)
                            .HasConversion(converterInstance);

                        break;
                    }

                    baseType = baseType.BaseType;
                }
            }
        }

        base.OnModelCreating(modelBuilder);
    }
}
