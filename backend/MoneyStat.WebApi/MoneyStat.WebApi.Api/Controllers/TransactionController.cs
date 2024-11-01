using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyStat.DataBase;
using MoneyStat.DataBase.Entities;
using MoneyStat.WebApi.Api.Attributes;
using MoneyStat.WebApi.Api.Dto.Transactions;

namespace MoneyStat.WebApi.Api.Controllers;

[ApiController]
[ApiRoute]
[Authorize]
public class TransactionController : ControllerBase
{
    private readonly IMoneyStatDbContext dbContext;
    private readonly UserManager<User> userManager;

    public TransactionController(IMoneyStatDbContext dbContext, UserManager<User> userManager)
    {
        this.dbContext = dbContext;
        this.userManager = userManager;
    }

    [HttpPost]
    public async Task<IActionResult> AddTransaction([FromBody] AddTransactionDto body,
        CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(userManager.GetUserId(User));
        var newTransaction = new Transaction
        {
            UserId = userId,
            TransactionCategoryId = body.TransactionCategoryId,
            Amount = body.Amount,
            IsIncome = body.IsIncome,
            Date = body.Date ?? DateTime.UtcNow,
            Comment = body.Comment
        };

        dbContext.Transactions.Add(newTransaction);
        await dbContext.SaveChangesAsync(cancellationToken);
        return Ok();
    }

    [HttpGet]
    public async Task<ActionResult<TransactionDto[]>> GetTransactions(CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(userManager.GetUserId(User));
        var transactions = await dbContext.Transactions
            .Where(t => t.UserId == userId)
            .ToArrayAsync(cancellationToken);
        return Ok(transactions.Select(t =>
            new TransactionDto(t.Id, t.Amount, t.IsIncome, t.TransactionCategoryId, t.Date, t.Comment)));
    }
}