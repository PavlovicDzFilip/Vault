using Microsoft.EntityFrameworkCore;
using Vault.Common.Infrastructure;
using Vault.Common.Infrastructure.ExecutionContexts;
using Vault.WebApi.Domain.Notes;

namespace Vault.WebApi.Domain;

public class VaultDbContext(DbContextOptions<VaultDbContext> options, IExecutionContext executionContext)
    : DbContextBase(options, executionContext)
{
    public DbSet<Note> Notes { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var note = modelBuilder.Entity<Note>();
        note.Property(x => x.Title).HasMaxLength(NoteTitle.MaxLength);
        note.Property(x => x.Id);
        note.Property(x => x.Content);

        base.OnModelCreating(modelBuilder);
    }
}