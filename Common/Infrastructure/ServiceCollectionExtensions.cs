using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Vault.Common.Infrastructure.ExecutionContexts;
using Vault.Common.WebApi;
using ExecutionContext = Vault.Common.Infrastructure.ExecutionContexts.ExecutionContext;

namespace Vault.Common.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static void AddVaultDatabase<TDbContext>(this IServiceCollection services, IConfiguration configuration)
        where TDbContext : DbContextBase
    {
        services.AddSingleton(configuration);
        var connectionString = configuration.GetConnectionString("Database");
        services.AddSqlServer<TDbContext>(connectionString);
        services.AddScoped<IUnitOfWork, UnitOfWork<TDbContext>>();
        services.AddScoped<IExecutionContext, ExecutionContext>();
    }
}
