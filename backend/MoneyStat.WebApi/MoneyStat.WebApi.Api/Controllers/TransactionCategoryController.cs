using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyStat.DataBase;
using MoneyStat.DataBase.Entities;
using MoneyStat.WebApi.Api.Attributes;
using MoneyStat.WebApi.Api.Dto.TransactionCategories;

namespace MoneyStat.WebApi.Api.Controllers;

[ApiController]
[ApiRoute]
[Authorize]
public class TransactionCategoryController : ControllerBase
{
    private readonly IMoneyStatDbContext dbContext;
    private readonly UserManager<User> userManager;

    public TransactionCategoryController(IMoneyStatDbContext dbContext, UserManager<User> userManager)
    {
        this.dbContext = dbContext;
        this.userManager = userManager;
    }

    [HttpPost]
    public async Task<IActionResult> AddTransactionCategory(AddTransactionCategoryDto body,
        CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(userManager.GetUserId(User));
        var newTransactionCategory = new TransactionCategory
        {
            UserId = userId,
            ParentTransactionCategoryId = body.ParentTransactionCategoryId,
            Name = body.Name
        };

        dbContext.TransactionCategories.Add(newTransactionCategory);
        await dbContext.SaveChangesAsync(cancellationToken);

        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult<TransactionCategoryDto[]>> GetAllTransactionCategories(
        CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(userManager.GetUserId(User));

        var categories = await dbContext.TransactionCategories
            .Where(c => c.UserId == userId)
            .ToArrayAsync(cancellationToken);

        return Ok(categories.Select(
            c => new TransactionCategoryDto(c.Name, Array.Empty<TransactionCategoryDto>(), null)));
    }
}