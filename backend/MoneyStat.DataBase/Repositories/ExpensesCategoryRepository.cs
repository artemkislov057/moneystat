using Microsoft.EntityFrameworkCore;
using MoneyStat.DataBase.Entities;

namespace MoneyStat.DataBase.Repositories;

public interface IExpensesCategoryRepository
{
    Task Add(ExpensesCategory category);
    Task<Guid> GetExpensesCategoryUserId(int categoryId);
    Task<ExpensesCategory[]> GetByUserId(Guid userId);
    Task<ExpensesCategory[]> GetBaseCategories();
    Task DeleteCategoriesByIds(IEnumerable<int> categoryIds);
    Task<ExpensesCategory?> GetById(int categoryId);
}

public class ExpensesCategoryRepository : IExpensesCategoryRepository
{
    private readonly IMoneyStatDbContext context;

    public ExpensesCategoryRepository(IMoneyStatDbContext context)
    {
        this.context = context;
    }

    public Task Add(ExpensesCategory category)
    {
        context.ExpensesCategories.Add(category);
        return context.SaveChangesAsync();
    }

    public Task<Guid> GetExpensesCategoryUserId(int categoryId) =>
        context.ExpensesCategories
            .Where(c => c.Id == categoryId)
            .Select(c => c.UserId)
            .FirstAsync();

    public Task<ExpensesCategory[]> GetByUserId(Guid userId) =>
        context.ExpensesCategories
            .Where(c => c.UserId == userId)
            .ToArrayAsync();

    public Task<ExpensesCategory[]> GetBaseCategories() =>
        context.ExpensesCategories
            .Where(c => c.ParentId == null)
            .ToArrayAsync();

    public Task DeleteCategoriesByIds(IEnumerable<int> categoryIds)
    {
        context.ExpensesCategories.RemoveRange(context.ExpensesCategories.Where(c => categoryIds.Contains(c.Id)));
        return context.SaveChangesAsync();
    }

    public Task<ExpensesCategory?> GetById(int categoryId) =>
        context.ExpensesCategories
            .FirstOrDefaultAsync(c => c.Id == categoryId);
}