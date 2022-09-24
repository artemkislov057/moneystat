using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MoneyStat.DataBase.Entities;
using MoneyStat.Infra.Helpers;
using MoneyStat.WebApi.Api.Attributes;
using MoneyStat.WebApi.Api.Dto.Common;
using MoneyStat.WebApi.Api.Dto.ExpensesCategories;
using MoneyStat.WebApi.Model.Entities.ExpensesCategories;
using MoneyStat.WebApi.Model.Exceptions.ExpensesCategories;
using MoneyStat.WebApi.Model.Services;

namespace MoneyStat.WebApi.Api.Controllers;

[ApiController]
[ApiRoute(typeof(ExpensesCategoriesController))]
[Authorize]
public class ExpensesCategoriesController : ControllerBase
{
    private readonly IExpensesCategoriesService service;
    private readonly UserManager<User> userManager;

    public ExpensesCategoriesController(IExpensesCategoriesService service, UserManager<User> userManager)
    {
        this.service = service;
        this.userManager = userManager;
    }

    /// <summary>
    /// Метод получения категорий
    /// </summary>
    /// <returns></returns>
    [HttpGet]
    [ProducesResponseType(200)]
    public async Task<ActionResult> GetCategories()
    {
        var result = await service.GetCategories(Guid.Parse(userManager.GetUserId(User)));
        return Ok(TypeMapper<ExpensesCategoryResult[], CategoryDto[]>.MapForward(result));
    }

    /// <summary>
    /// Метод для добавления подкатегории
    /// </summary>
    [HttpPost]
    [ProducesResponseType(201)]
    public async Task<ActionResult<CategoryDto>> PostCategory([FromBody] PostCategoryRequestDto dto)
    {
        var userId = Guid.Parse(userManager.GetUserId(User));
        var id = await service.AddCategory(dto.Name, dto.ParentId.Value, userId, dto.IsParentBase.Value);
        return Created(string.Empty, new CategoryDto
        {
            Id = id,
            Name = dto.Name
        });
    }

    /// <summary>
    /// Удалить категорию (также удаляет подкатегории)
    /// </summary>
    [HttpDelete]
    [Route("{id:int}")]
    [ProducesResponseType(200)]
    public async Task<ActionResult> DeleteCategory([FromRoute] int id)
    {
        var userId = Guid.Parse(userManager.GetUserId(User));
        await service.DeleteCategory(id, userId);
        return Ok();
    }
}