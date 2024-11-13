using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Vault.Common.Domain.Exceptions;

namespace Vault.Common.WebApi.ExceptionHandlers;

internal class EntityNotFoundDetailsWriter : IExceptionHandler
{
    private sealed record NotFoundDetails(string Id, string Type, string Message) : VaultProblemDetails("EntityNotFound");

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        if (exception is not EntityNotFoundException entityNotFoundException)
        {
            return false;
        }
        
        var details = new NotFoundDetails(entityNotFoundException.Id, entityNotFoundException.Type.Name, "The entity was not found.");

        httpContext.Response.StatusCode = StatusCodes.Status404NotFound;
        await httpContext.Response.WriteAsJsonAsync(details, cancellationToken);
        return true;
    }
}

public record VaultProblemDetails(string Key);
