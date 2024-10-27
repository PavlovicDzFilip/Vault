using Vault.Common.Domain;

namespace Vault.WebApi.Domain.Notes;

public record NoteContent(string Value) : SingleValueObject<NoteContent, string>(Value);