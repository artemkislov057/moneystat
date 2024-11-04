using MoneyStat.DAL.DataBase.Entities;

namespace MoneyStat.WebApi.Domain.Abstractions;

public interface IUserManager
{
    Task<User> GetCurrentUser(CancellationToken cancellationToken = default);
    Guid GetUserId();
}