using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Vault.Common.Domain;

namespace Vault.Common.Infrastructure;

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
