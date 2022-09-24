using MoneyStat.DataBase.Entities;
using MoneyStat.DataBase.Repositories;
using MoneyStat.Infra.Helpers;
using MoneyStat.WebApi.Model.Entities.ExpensesCategories;
using MoneyStat.WebApi.Model.Exceptions.ExpensesCategories;

namespace MoneyStat.WebApi.Model.Services;

public interface IExpensesCategoriesService
{
    Task<ExpensesCategoryResult[]> GetCategories(Guid userId);
    Task<int> AddCategory(string name, int parentId, Guid userId, bool toBaseCategory);
    Task DeleteCategory(int categoryId, Guid userId);
}

public class ExpensesCategoriesService : IExpensesCategoriesService
{
    private readonly IExpensesCategoryRepository categoryRepository;
    private readonly IBaseExpensesCategoryRepository baseExpensesCategoryRepository;

    public ExpensesCategoriesService(IExpensesCategoryRepository categoryRepository,
        IBaseExpensesCategoryRepository baseExpensesCategoryRepository)
    {
        this.categoryRepository = categoryRepository;
        this.baseExpensesCategoryRepository = baseExpensesCategoryRepository;
    }

    public async Task<ExpensesCategoryResult[]> GetCategories(Guid userId)
    {
        var baseCategories = (await baseExpensesCategoryRepository.Get())
            .Select(TypeMapper<BaseExpensesCategory, ExpensesCategoryResult>.MapForward)
            .ToArray();
        var subcategories = (await categoryRepository.GetByUserId(userId))
            .Select(TypeMapper<ExpensesCategory, ExpensesCategoryResult>.MapForward);

        FillSubcategoriesInCategories(baseCategories, subcategories);
        return baseCategories.ToArray();
    }

    public async Task<int> AddCategory(string name, int parentId, Guid userId, bool toBaseCategory)
    {
        if (toBaseCategory)
        {
            if (!await baseExpensesCategoryRepository.IsExist(parentId))
            {
                throw new BaseExpensesCategoryNotFoundException(parentId);
            }
        }
        else
        {
            await CheckIsUsersCategory(parentId, userId);
        }


        var entity = new ExpensesCategory
        {
            Name = name,
            ParentId = parentId,
            IsParentBase = toBaseCategory,
            UserId = userId
        };
        await categoryRepository.Add(entity);
        return entity.Id;
    }

    public async Task DeleteCategory(int categoryId, Guid userId)
    {
        await CheckIsUsersCategory(categoryId, userId);
        var category = await categoryRepository.GetById(categoryId);
        var categoryResult = TypeMapper<ExpensesCategory, ExpensesCategoryResult>.MapForward(category);
        var subCategories = (await categoryRepository.GetByUserId(userId))
            .Select(TypeMapper<ExpensesCategory, ExpensesCategoryResult>.MapForward)
            .Where(c => !c.IsParentBase.Value && c.Id != categoryId)
            .ToArray();
        foreach (var subcategory in subCategories.Where(c => c.ParentId == categoryId))
        {
            subcategory.IsParentBase = true;
        }
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

    private async Task CheckIsUsersCategory(int categoryId, Guid userId)
    {
        bool isException;
        try
        {
            isException = await categoryRepository.GetExpensesCategoryUserId(categoryId) != userId;
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

    private static void FillSubcategoriesInCategories(IEnumerable<ExpensesCategoryResult> categoriesToFill,
        IEnumerable<ExpensesCategoryResult> subcategories)
    {
        var categoriesIdDictionary = categoriesToFill.ToDictionary(c => c.Id,
            c => new FillHelper { Base = c });
        foreach (var subcategory in subcategories)
        {
            if (categoriesIdDictionary.ContainsKey(subcategory.Id))
            {
                categoriesIdDictionary[subcategory.Id].Sub = subcategory;
            }
            else
            {
                categoriesIdDictionary[subcategory.Id] = new FillHelper { Sub = subcategory };
            }

            if (!categoriesIdDictionary.ContainsKey(subcategory.ParentId.Value)) continue;
            if (subcategory.IsParentBase.Value)
            {
                categoriesIdDictionary[subcategory.ParentId.Value].Base.Subcategories.Add(subcategory);
            }
            else
            {
                categoriesIdDictionary[subcategory.ParentId.Value].Sub.Subcategories.Add(subcategory);
            }
        }
    }

    private class FillHelper
    {
        public ExpensesCategoryResult? Base { get; set; }
        public ExpensesCategoryResult? Sub { get; set; }
    }
}