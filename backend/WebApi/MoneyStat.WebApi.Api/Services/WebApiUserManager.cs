using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using MoneyStat.DAL.DataBase.Entities;
using MoneyStat.WebApi.Domain.Abstractions;

namespace MoneyStat.WebApi.Api.Services;

public class WebApiUserManager : IUserManager
{
    private readonly UserManager<User> userManager;
    private readonly HttpContextAccessor httpContextAccessor;

    private HttpContext HttpContext => httpContextAccessor.HttpContext ??
                                       throw new NullReferenceException(nameof(httpContextAccessor.HttpContext));

    public WebApiUserManager(UserManager<User> userManager, HttpContextAccessor httpContextAccessor)
    {
        this.userManager = userManager;
        this.httpContextAccessor = httpContextAccessor;
    }

    public async Task<User> GetCurrentUser(CancellationToken cancellationToken = default)
    {
        var user = await userManager.GetUserAsync(HttpContext.User);
        return user ?? throw new NullReferenceException(nameof(user));
    }

    public Guid GetUserId()
    {
        var userId = userManager.GetUserId(HttpContext.User) ??
                     throw new NullReferenceException(
                         $"Не удалось получить идентификатор пользователя из {nameof(ClaimsPrincipal)}");

        return Guid.Parse(userId);
    }
}