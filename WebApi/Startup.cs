using Microsoft.EntityFrameworkCore;
using Vault.Common.WebApi;
using Vault.WebApi.Domain;
using Vault.WebApi.Domain.Notes;

namespace Vault.WebApi;

public static class Startup
{
    public static void Configure(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<NoteRepository>();
        services.AddSingleton(configuration);
        var connectionString = configuration.GetConnectionString("Database");
        services.AddSqlServer<VaultDbContext>(connectionString);
        services.AddScoped<IUnitOfWork, UnitOfWork<VaultDbContext>>();
    }
}