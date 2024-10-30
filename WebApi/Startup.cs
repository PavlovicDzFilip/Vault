using Vault.Common.Infrastructure;
using Vault.WebApi.Domain;
using Vault.WebApi.Domain.Notes;

namespace Vault.WebApi;

public static class Startup
{
    public static void Configure(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<NoteRepository>();
        services.AddVaultDatabase<VaultDbContext>(configuration);
    }
}
