using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi.Models;

namespace Vault.WebApi.OpenApi;

public class OperationIdFilter : IOpenApiOperationTransformer
{
    private static readonly Dictionary<string, HashSet<string>> OperationsPerController = new();

    public Task TransformAsync(OpenApiOperation operation, OpenApiOperationTransformerContext context, CancellationToken cancellationToken)
    {
        if (operation.OperationId is not null || 
            context.Description.ActionDescriptor is not ControllerActionDescriptor actionDescriptor)
        {
            return Task.CompletedTask;
        }

        var actionMethodName = actionDescriptor.MethodInfo.Name;
        var controllerName = actionDescriptor.ControllerName;
        if(!OperationsPerController.TryGetValue(controllerName, out var operations))
        {
            operations = new HashSet<string>();
            OperationsPerController.Add(controllerName, operations);
        }

        if (!operations.Add(actionMethodName))
        {
            throw new DuplicateOperationIdException(controllerName, actionMethodName);
        }
        
        operation.OperationId = actionMethodName;
        return Task.CompletedTask;
    }

    private sealed class DuplicateOperationIdException(string controllerName, string actionName)
        : Exception($"Controller {controllerName} action {actionName} is already registered. Rename the method to avoid duplicates.");
}
