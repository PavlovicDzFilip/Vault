using System.Linq.Expressions;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Vault.Common.Domain;
using Vault.Common.Infrastructure.Interceptors;

namespace Vault.Common.Infrastructure;

public abstract class DbContextBase(DbContextOptions options) : DbContext(options)
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.AddInterceptors(new AggregateRootInterceptor());
        optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.TrackAll);
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

public static class PropertyBuilderExtensions
{
    public static void IsSingleValueObject<T, TValue>(this PropertyBuilder<T> propertyBuilder)
        where T : SingleValueObject<T, TValue>
        where TValue : IComparable<TValue>
    {
        propertyBuilder.HasConversion(new SingleValueObjectConverter<T, TValue>());
    }
}

public class SingleValueObjectConverter<T, TValue> : ValueConverter<T, TValue>
    where T : SingleValueObject<T, TValue>
    where TValue : IComparable<TValue>
{
    public SingleValueObjectConverter() : base(
        valueObject => valueObject.Value,
        value => (T)Activator.CreateInstance(typeof(T), value)!)
    {
    }
}