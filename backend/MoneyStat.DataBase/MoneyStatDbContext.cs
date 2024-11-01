using Microsoft.EntityFrameworkCore;
using MoneyStat.DataBase.Entities;

namespace MoneyStat.DataBase;

public interface IMoneyStatDbContext : IMoneyStatDbContextBase
{
    DbSet<User> Users { get; set; }
    DbSet<Transaction> Transactions { get; set; }
    DbSet<TransactionCategory> TransactionCategories { get; set; }
}

public sealed class MoneyStatDbContext : MoneyStatDbContextBase, IMoneyStatDbContext
{
    public MoneyStatDbContext(DbContextOptions<MoneyStatDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<TransactionCategory> TransactionCategories { get; set; }
}