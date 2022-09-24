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
        var subcategories = (await categoryRepository.GetByUserId(userId))
            .Select(TypeMapper<ExpensesCategory, ExpensesCategoryResult>.MapForward);

        FillSubcategoriesInCategories(baseCategories, subcategories);
        return baseCategories.ToArray();
    }

    public async Task<int> AddCategory(string name, int parentId, Guid userId)
    {
        await CheckIsUsersCategory(parentId, userId, false);

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
        var category = await categoryRepository.GetById(categoryId);
        var categoryResult = TypeMapper<ExpensesCategory, ExpensesCategoryResult>.MapForward(category);
        var subCategories = (await categoryRepository.GetByUserId(userId))
            .Select(TypeMapper<ExpensesCategory, ExpensesCategoryResult>.MapForward)
            .Where(c => c.Id != categoryId);
        FillSubcategoriesInCategories(new[] { categoryResult }, subCategories);

        var result = new List<int>();
        var toCheck = new List<ExpensesCategoryResult> { categoryResult };
        while (toCheck.Any())
        {
            var nextCheck = new List<ExpensesCategoryResult>();
            foreach (var toCheckUnit in toCheck)
            {
                result.Add(toCheckUnit.Id);
                nextCheck.AddRange(toCheckUnit.Subcategories);
            }

            toCheck = nextCheck;
        }

        await categoryRepository.DeleteCategoriesByIds(result);
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

    private static void FillSubcategoriesInCategories(IEnumerable<ExpensesCategoryResult> categories,
        IEnumerable<ExpensesCategoryResult> subcategories)
    {
        var categoriesIdDictionary = categories.ToDictionary(c => c.Id);
        foreach (var subcategory in subcategories)
        {
            if (!categoriesIdDictionary.ContainsKey(subcategory.Id))
            {
                categoriesIdDictionary[subcategory.Id] = subcategory;
            }

            if (categoriesIdDictionary.ContainsKey(subcategory.ParentId.Value))
            {
                categoriesIdDictionary[subcategory.ParentId.Value].Subcategories.Add(subcategory);
            }
        }
    }
}