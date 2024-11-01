using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MoneyStat.DAL.Database.SqlServer;

public class MoneyStatDbContextSqlServerFactory : IDesignTimeDbContextFactory<MoneyStatDbContextSqlServer>
{
    public MoneyStatDbContextSqlServer CreateDbContext(string[] args) =>
        new(new DbContextOptionsBuilder<MoneyStatDbContextSqlServer>().UseSqlServer().Options);
}