using FluentAssertions;
using Microsoft.Extensions.DependencyInjection;
using Vault.Common.Infrastructure.Interceptors;

namespace Vault.Common.Tests.Infrastructure;

[Collection($"{nameof(ServiceFixture)}")]
public class DbContextBaseTests : ServiceFixture
{
    public class SaveChanges : DbContextBaseTests
    {
        [Fact]
        public void AlwaysThrows()
        {
            // Arrange
            using var scope = ServiceProvider.CreateScope();
            var databaseContext = scope.ServiceProvider.GetRequiredService<TestDatabaseContext>();

            // Act
            // Arrange
            var fn = () => databaseContext.SaveChanges();

            fn.Should().ThrowExactly<ThrowOnSynchronousSaveChangesInterceptor.SynchronousSaveChangesForbiddenException>();
        }
    }

    public class SaveChangesAsync : DbContextBaseTests
    {
        [Fact]
        public async Task FirstCall_Succeeds()
        {
            // Arrange
            using var scope = ServiceProvider.CreateScope();
            var databaseContext = scope.ServiceProvider.GetRequiredService<TestDatabaseContext>();

            // Act
            var fn = async () => await databaseContext.SaveChangesAsync();

            // Arrange

            await fn.Should().NotThrowAsync();
        }

        [Fact]
        public async Task SubsequentCalls_Fail()
        {
            // Arrange
            using var scope = ServiceProvider.CreateScope();
            var databaseContext = scope.ServiceProvider.GetRequiredService<TestDatabaseContext>();

            // Act
            await databaseContext.SaveChangesAsync();
            var fn = async () => await databaseContext.SaveChangesAsync();

            // Arrange
            await fn.Should().ThrowExactlyAsync<ThrowOnMultipleSaveChangesInterceptor.MultipleSaveChangesInvocationException>();
        }
    }
}
