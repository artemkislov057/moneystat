using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MoneyStat.DataBase.Entities;

namespace MoneyStat.DataBase;

public interface IMoneyStatDbContextBase
{
    Task SaveChangesAsync();
}

public class MoneyStatDbContextBase : IdentityDbContext<User, IdentityRole<Guid>, Guid>, IMoneyStatDbContextBase
{
    public MoneyStatDbContextBase(DbContextOptions<MoneyStatDbContext> options)
        : base(options)
    {
        Database.EnsureCreated();
    }
    
    public Task SaveChangesAsync()
    {
        return base.SaveChangesAsync();
    }
}