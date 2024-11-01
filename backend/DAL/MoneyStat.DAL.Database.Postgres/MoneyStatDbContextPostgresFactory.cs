using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MoneyStat.DAL.Database.Postgres;

public class MoneyStatDbContextPostgresFactory : IDesignTimeDbContextFactory<MoneyStatDbContextPostgres>
{
    public MoneyStatDbContextPostgres CreateDbContext(string[] args) =>
        new(new DbContextOptionsBuilder().UseNpgsql().Options);
}