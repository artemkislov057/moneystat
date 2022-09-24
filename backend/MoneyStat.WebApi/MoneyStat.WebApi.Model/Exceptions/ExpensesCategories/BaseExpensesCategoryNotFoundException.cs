namespace MoneyStat.WebApi.Model.Exceptions.ExpensesCategories;

public class BaseExpensesCategoryNotFoundException : Exception
{
    public BaseExpensesCategoryNotFoundException(int categoryId)
        : base($"Основная категория с id {categoryId} не существует")
    {
    }
}