using Microsoft.EntityFrameworkCore;
using Vault.Common.Infrastructure;
using Vault.Common.Infrastructure.ExecutionContexts;

namespace Vault.Common.Tests.Infrastructure;

public class TestDatabaseContext(DbContextOptions options, IExecutionContext executionContext) : DbContextBase(options, executionContext)
{
    public DbSet<TestAggregateRoot> TestAggregates { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TestAggregateRoot>()
            .HasKey(x => x.Id);

        base.OnModelCreating(modelBuilder);
    }
}