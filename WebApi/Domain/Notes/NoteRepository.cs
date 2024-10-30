using Vault.Common.Infrastructure;

namespace Vault.WebApi.Domain.Notes;

public class NoteRepository(VaultDbContext context) : RepositoryBase<Note, NoteId>(context)
{
}
