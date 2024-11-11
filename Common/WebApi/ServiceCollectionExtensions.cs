using Microsoft.Extensions.DependencyInjection;
using Vault.Common.WebApi.ExceptionHandlers;

namespace Vault.Common.WebApi;

public static class ServiceCollectionExtensions
{
    public static void AddVaultExceptionHandling(this IServiceCollection services)
    {
        services.AddProblemDetails();
        services.AddExceptionHandler<EntityNotFoundDetailsWriter>();
    }
}
