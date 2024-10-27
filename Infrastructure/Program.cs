using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Vault.Infrastructure;

var hostBuilder = Host.CreateApplicationBuilder(args);
Startup.Configure(hostBuilder.Services, hostBuilder.Configuration);

var app = hostBuilder.Build();
var deployment = app.Services.GetRequiredService<Deployment>();
deployment.DeployInfrastructure();
