using Vault.Common.Domain;

namespace Vault.WebApi.Domain.Notes;

public record NoteId(long Value) : StronglyTypedId<NoteId>(Value);