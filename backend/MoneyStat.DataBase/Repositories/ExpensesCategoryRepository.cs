using Microsoft.EntityFrameworkCore;
using MoneyStat.DataBase.Entities;

namespace MoneyStat.DataBase.Repositories;

public interface IExpensesCategoryRepository
{
    Task Add(ExpensesCategory category);
    Task<Guid?> GetExpensesCategoryUserId(int id);
    Task<ExpensesCategory[]> GetByUserId(Guid userId);
    Task<ExpensesCategory[]> GetBaseCategories();
    Task DeleteCategoryWithSubcategories(int categoryId, Guid userId);
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

    public Task<Guid?> GetExpensesCategoryUserId(int id) =>
        context.ExpensesCategories
            .Where(c => c.Id == id)
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

    public Task DeleteCategoryWithSubcategories(int categoryId, Guid userId)
    {
        throw new NotImplementedException();
    }
}