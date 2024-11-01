using Microsoft.EntityFrameworkCore;
using MoneyStat.DAL.DataBase;

namespace MoneyStat.DAL.Database.SqlServer;

public sealed class MoneyStatDbContextSqlServer : MoneyStatDbContext
{
    public MoneyStatDbContextSqlServer(DbContextOptions options) : base(options)
    {
    }
}