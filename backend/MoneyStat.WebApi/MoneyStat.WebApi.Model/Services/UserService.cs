using MoneyStat.DataBase.Entities;
using MoneyStat.DataBase.Repositories;

namespace MoneyStat.WebApi.Model.Services;

public interface IUserService
{
    Task AddUser(User user);
    Task<User> GetUser(int id);
}

public sealed class UserService : IUserService
{
    private readonly IUserRepository userRepository;

    public UserService(IUserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public Task AddUser(User user)
    {
        return userRepository.AddUser(user);
    }

    public Task<User> GetUser(int id)
    {
        return userRepository.GetUserById(id);
    }
}