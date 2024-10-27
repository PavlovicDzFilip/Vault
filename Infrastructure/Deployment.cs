using System.Reflection;
using DbUp;
using DbUp.Engine.Output;
using Microsoft.Extensions.Configuration;

namespace Vault.Infrastructure;
public class Deployment(IConfiguration configuration, IUpgradeLog upgradeLog)
{
    public void DeployInfrastructure()
    {
        UpgradeDatabase(configuration, upgradeLog);
    }

    private static void UpgradeDatabase(IConfiguration configuration, IUpgradeLog upgradeLog)
    {
        var connectionString = configuration.GetConnectionString("Database");
        EnsureDatabase.For.SqlDatabase(connectionString);

        var result =
            DeployChanges.To
                .SqlDatabase(connectionString)
                .WithScriptsEmbeddedInAssembly(Assembly.GetExecutingAssembly())
                .LogTo(upgradeLog)
                .Build()
                .PerformUpgrade();

        if (!result.Successful)
        {
            Environment.Exit(-1);
        }
    }
}