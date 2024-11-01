using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MoneyStat.DAL.DataBase.Entities;

namespace MoneyStat.DAL.DataBase;

public interface IMoneyStatDbContext
{
    DbSet<User> Users { get; set; }
    DbSet<Transaction> Transactions { get; set; }
    DbSet<TransactionCategory> TransactionCategories { get; set; }
    
    Task SaveChangesAsync(CancellationToken cancellationToken = default);
}

public abstract class MoneyStatDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>, IMoneyStatDbContext
{
    public MoneyStatDbContext(DbContextOptions options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<TransactionCategory> TransactionCategories { get; set; }

    public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        await base.SaveChangesAsync(cancellationToken);
    }
}