using Microsoft.AspNetCore.Identity;

namespace MoneyStat.DataBase.Entities;

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