using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace MoneyStat.DataBase;

public class MoneyStatDbContextFactory : IDesignTimeDbContextFactory<MoneyStatDbContext>
{
    public MoneyStatDbContext CreateDbContext(string[] args) =>
        new(new DbContextOptionsBuilder().UseSqlServer().Options);
}