using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vault.Common.Domain;

public abstract class Entity<T>(T id) : IEquatable<Entity<T>> where T : IComparable<T>
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public T Id { get; init; } = id;

    public virtual bool Equals(Entity<T>? other)
    {
        return !ReferenceEquals(null, other)
               && (ReferenceEquals(this, other) || EqualityComparer<T>.Default.Equals(Id, other.Id));
    }

    public override bool Equals(object? obj)
    {
        return Equals(obj as Entity<T>);
    }

    public override int GetHashCode()
    {
        return EqualityComparer<T>.Default.GetHashCode(Id);
    }

    public static bool operator ==(Entity<T>? a, Entity<T>? b)
    {
        return a?.Equals(b) == true;
    }

    public static bool operator !=(Entity<T>? a, Entity<T>? b)
    {
        return !(a == b);
    }
}
