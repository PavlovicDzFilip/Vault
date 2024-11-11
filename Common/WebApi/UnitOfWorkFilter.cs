using JetBrains.Annotations;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Vault.Common.WebApi;

[UsedImplicitly]
public sealed class UnitOfWorkFilter : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var actionExecutedContext = await next();
        if (actionExecutedContext.Exception is not null)
        {
            return;
        }

        var unitOfWork = context.HttpContext.RequestServices.GetRequiredService<IUnitOfWork>();
        var stateModifyingHttpMethods = new[] { HttpMethod.Put, HttpMethod.Delete, HttpMethod.Patch, HttpMethod.Post };
        var httpMethod = HttpMethod.Parse(context.HttpContext.Request.Method);
        if (stateModifyingHttpMethods.Contains(httpMethod))
        {
            await unitOfWork.Commit(context.HttpContext.RequestAborted);
            return;
        }

        if (unitOfWork.HasChanges())
        {
            throw new NotSupportedException($"State is changed on {httpMethod.Method} http method");
        }
    }
}
