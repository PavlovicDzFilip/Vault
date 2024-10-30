using Vault.Common.Domain;

namespace Vault.WebApi.Domain.Notes;

public record NoteTitle : SingleValueObject<NoteTitle, string>
{
    public const int MaxLength = 200;

    public NoteTitle(string Value) : base(Value)
    {
        if (string.IsNullOrEmpty(Value) ||
            Value.Length > MaxLength)
            throw new ArgumentException($"'{nameof(Value)}' cannot be longer than {MaxLength} characters.");
    }
}
