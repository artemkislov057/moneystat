using MoneyStat.DataBase.Entities;
using MoneyStat.DataBase.Repositories;
using MoneyStat.Infra.Helpers;
using MoneyStat.WebApi.Model.Entities.ExpensesCategories;
using MoneyStat.WebApi.Model.Exceptions.ExpensesCategories;

namespace MoneyStat.WebApi.Model.Services;

public interface IExpensesCategoriesService
{
    Task<ExpensesCategoryResult[]> GetCategories(Guid userId);
    Task<int> AddCategory(string name, int parentId, Guid userId);
    Task DeleteCategory(int categoryId, Guid userId);
}

public class ExpensesCategoriesService : IExpensesCategoriesService
{
    private readonly IExpensesCategoryRepository categoryRepository;

    public ExpensesCategoriesService(IExpensesCategoryRepository categoryRepository)
    {
        this.categoryRepository = categoryRepository;
    }

    public async Task<ExpensesCategoryResult[]> GetCategories(Guid userId)
    {
        var baseCategories = (await categoryRepository.GetBaseCategories())
            .Select(TypeMapper<ExpensesCategory, ExpensesCategoryResult>.MapForward)
            .ToArray();
        var subCategories = (await categoryRepository.GetByUserId(userId))
            .Select(TypeMapper<ExpensesCategory, ExpensesCategoryResult>.MapForward);
        var categoriesIdDictionary = baseCategories.ToDictionary(c => c.Id);
        foreach (var subCategory in subCategories)
        {
            categoriesIdDictionary[subCategory.Id] = subCategory;
            categoriesIdDictionary[subCategory.ParentId.Value].Subcategories.Add(subCategory);
        }

        return baseCategories.ToArray();
    }

    public async Task<int> AddCategory(string name, int parentId, Guid userId)
    {
        await CheckIsUsersCategory(parentId, userId, true);

        var entity = new ExpensesCategory
        {
            Name = name,
            ParentId = parentId,
            UserId = userId
        };
        await categoryRepository.Add(entity);
        return entity.Id;
    }

    public async Task DeleteCategory(int categoryId, Guid userId)
    {
        await CheckIsUsersCategory(categoryId, userId, true);
        await categoryRepository.DeleteCategoryWithSubcategories(categoryId, userId);
    }

    private async Task CheckIsUsersCategory(int categoryId, Guid userId, bool onlySubcategories)
    {
        bool isException;
        try
        {
            var actualUserId = await categoryRepository.GetExpensesCategoryUserId(categoryId);
            isException = onlySubcategories
                ? actualUserId != userId
                : actualUserId is not null && actualUserId != userId;
        }
        catch (InvalidOperationException e)
        {
            isException = true;
        }

        if (isException)
        {
            throw new NotUsersCategoryException(categoryId);
        }
    }
}