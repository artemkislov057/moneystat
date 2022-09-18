using Microsoft.EntityFrameworkCore;
using MoneyStat.DataBase.Entities;

namespace MoneyStat.DataBase.Repositories;

public interface IUserRepository
{
    Task<User> GetUserById(int id);
    Task AddUser(User user);
}

public class UserRepository : IUserRepository
{
    private readonly IMoneyStatDbContext context;

    public UserRepository(IMoneyStatDbContext context)
    {
        this.context = context;
    }

    public Task<User> GetUserById(int id) =>
        context.Users
            .FirstOrDefaultAsync(u => u.Id == id);

    public async Task AddUser(User user)
    {
        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();
    }
}