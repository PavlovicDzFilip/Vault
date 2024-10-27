namespace Vault.Common.Domain;

public abstract record SingleValueObject<T, TValue>(TValue Value) : IComparable<SingleValueObject<T, TValue>>
    where T : SingleValueObject<T, TValue> where TValue : IComparable<TValue>
{
    public int CompareTo(SingleValueObject<T, TValue>? other)
    {
        return other is null ? 1 : Value.CompareTo(other.Value);
    }

    public virtual bool Equals(SingleValueObject<T, TValue>? other)
    {
        return other is not null && Value.Equals(other.Value);
    }

    public override int GetHashCode()
    {
        return Value.GetHashCode();
    }

    public static implicit operator TValue(SingleValueObject<T, TValue> valueObject)
    {
        return valueObject.Value;
    }
}
