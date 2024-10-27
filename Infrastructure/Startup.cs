﻿using DbUp.Engine.Output;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Vault.Infrastructure;
public static class Startup
{
    public static void Configure( IServiceCollection services, IConfiguration configuration)
    {
        services.AddLogging(logging => logging
            .AddFilter("Microsoft", LogLevel.Warning)
            .AddFilter("System", LogLevel.Warning)
            .AddConsole());

        services.AddSingleton(configuration);

        services.AddSingleton<Deployment>();
        services.AddScoped<IUpgradeLog, LoggerAdapter>();
    }
}