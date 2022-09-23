using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MoneyStat.DataBase.Entities;
using MoneyStat.Infra.Helpers;
using MoneyStat.WebApi.Api.Attributes;
using MoneyStat.WebApi.Api.Dto.Common;
using MoneyStat.WebApi.Api.Dto.Users;

namespace MoneyStat.WebApi.Api.Controllers;

[ApiController]
[ApiRoute(typeof(UsersController))]
public sealed class UsersController : ControllerBase
{
    private readonly UserManager<User> userManager;
    private readonly SignInManager<User> signInManager;

    public UsersController(UserManager<User> userManager, SignInManager<User> signInManager)
    {
        this.userManager = userManager;
        this.signInManager = signInManager;
    }

    /// <summary>
    /// Регистрация пользователя
    /// </summary>
    [HttpPost]
    [Route("registration")]
    [ProducesResponseType(201)]
    public async Task<ActionResult> RegisterUser([FromBody] UserRequestDto requestDto)
    {
        var entity = new User(requestDto.Email)
        {
            Email = requestDto.Email
        };
        var result = await userManager.CreateAsync(entity, requestDto.Password);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        await signInManager.SignInAsync(entity, true);
        var createdUser = TypeMapper<User, UserResultDto>.MapForward(entity);
        return Created("api/users", createdUser);
    }

    /// <summary>
    /// Логин
    /// </summary>
    [HttpPost]
    [Route("login")]
    [ProducesResponseType(200)]
    public async Task<ActionResult> LoginUser([FromBody] UserRequestDto requestDto)
    {
        var result =
            await signInManager.PasswordSignInAsync(requestDto.Email, requestDto.Password, true, false);
        if (!result.Succeeded)
        {
            return BadRequest(new ErrorDto
            {
                HttpCode = 404,
                Message = "Неправильный логин или пароль"
            });
        }

        return Ok();
    }

    /// <summary>
    /// Выйти из аккаунта
    /// </summary>
    [HttpPost]
    [Route("logout")]
    [Authorize]
    [ProducesResponseType(200)]
    public async Task<ActionResult> LogoutUser()
    {
        await signInManager.SignOutAsync();
        return Ok();
    }

    /// <summary>
    /// Получить информацию о пользователе
    /// </summary>
    [HttpGet]
    [Authorize]
    [ProducesResponseType(typeof(UserResultDto), 200)]
    public async Task<ActionResult<UserResultDto>> GetUser()
    {
        var entity = await userManager.GetUserAsync(User);
        var result = TypeMapper<User, UserResultDto>.MapForward(entity);
        return Ok(result);
    }
}