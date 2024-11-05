using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Vault.Common.Infrastructure;

namespace Vault.Common.Tests.Infrastructure;

[CollectionDefinition($"{nameof(ServiceFixture)}")]
public class ServiceFixture
{
    public readonly IServiceProvider ServiceProvider;

    public ServiceFixture()
    {
        var services = new ServiceCollection();
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.test.json")
            .Build();

        services.AddVaultDatabase<TestDatabaseContext>(configuration);
        ServiceProvider = services.BuildServiceProvider();

        using var scope = ServiceProvider.CreateScope();
        var databaseContext = scope.ServiceProvider.GetRequiredService<TestDatabaseContext>();
        databaseContext.Database.EnsureDeleted();
        databaseContext.Database.EnsureCreated();
    }
}
