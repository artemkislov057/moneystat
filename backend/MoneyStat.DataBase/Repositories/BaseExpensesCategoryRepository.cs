using Microsoft.EntityFrameworkCore;
using MoneyStat.DataBase.Entities;

namespace MoneyStat.DataBase.Repositories;

public interface IBaseExpensesCategoryRepository
{
    Task<BaseExpensesCategory[]> Get();
    Task<bool> IsExist(int id);
}

public class BaseExpensesCategoryRepository : IBaseExpensesCategoryRepository
{
    private readonly IMoneyStatDbContext context;

    public BaseExpensesCategoryRepository(IMoneyStatDbContext context)
        => this.context = context;

    public Task<BaseExpensesCategory[]> Get()
        => context.BaseExpensesCategories.ToArrayAsync();

    public Task<bool> IsExist(int id)
        => context.BaseExpensesCategories.AnyAsync(c => c.Id == id);
}