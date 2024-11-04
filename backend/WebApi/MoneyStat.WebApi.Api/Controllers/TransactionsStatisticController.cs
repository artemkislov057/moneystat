using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoneyStat.DAL.DataBase.Entities;
using MoneyStat.DAL.Database.Postgres;
using MoneyStat.WebApi.Api.Attributes;
using MoneyStat.WebApi.Api.Dto.TransactionsStatistic;

namespace MoneyStat.WebApi.Api.Controllers;

[ApiController]
[ApiRoute("transactions-statistic")]
[Authorize]
public class TransactionsStatisticController : ControllerBase
{
    private readonly MoneyStatDbContextPostgres dbContext;
    private readonly UserManager<User> userManager;

    public TransactionsStatisticController(MoneyStatDbContextPostgres dbContext, UserManager<User> userManager)
    {
        this.dbContext = dbContext;
        this.userManager = userManager;
    }

    [HttpGet]
    [Route("total-amount")]
    public async Task<IActionResult> GetTotalAmount([FromQuery] GetTotalAmountRequestBody requestBody,
        CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(userManager.GetUserId(User)!);

        var queryable = dbContext.Transactions
            .Where(t =>
                t.UserId == userId &&
                t.IsIncome == requestBody.IsIncome &&
                t.Date >= requestBody.BeginDate &&
                t.Date <= requestBody.EndDate);

        if (requestBody.TransactionCategoryId.HasValue)
        {
            queryable = queryable.Where(t => t.TransactionCategoryId == requestBody.TransactionCategoryId);
        }

        var totalAmount = await queryable
            .Select(t => t.Amount)
            .SumAsync(cancellationToken);

        return Ok(new GetTotalAmountResultBody { TotalAmount = totalAmount });
    }
}