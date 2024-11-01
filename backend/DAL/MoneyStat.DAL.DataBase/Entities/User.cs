using Microsoft.AspNetCore.Identity;

namespace MoneyStat.DAL.DataBase.Entities;

public sealed class User : IdentityUser<Guid>
{
    public User()
    {
    }

    public User(string userName)
        : base(userName)
    {
    }
}