using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MoneyStat.DataBase.Entities;
using MoneyStat.WebApi.Api.Attributes;
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

    [HttpPost]
    [Route("registration")]
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
        return Ok();
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult> LoginUser([FromBody] UserRequestDto requestDto)
    {
        var result =
            await signInManager.PasswordSignInAsync(requestDto.Email, requestDto.Password, true, false);
        if (!result.Succeeded)
        {
            return BadRequest();
        }

        return Ok();
    }

    [HttpPost]
    [Route("logout")]
    [Authorize]
    public async Task<ActionResult> LogoutUser()
    {
        await signInManager.SignOutAsync();
        return Ok();
    }
}