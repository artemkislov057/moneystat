using Microsoft.EntityFrameworkCore;
using MoneyStat.DAL.DataBase;

namespace MoneyStat.DAL.Database.Postgres;

public class MoneyStatDbContextPostgres : MoneyStatDbContext
{
    public MoneyStatDbContextPostgres(DbContextOptions options)
        : base(options)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
    }
}