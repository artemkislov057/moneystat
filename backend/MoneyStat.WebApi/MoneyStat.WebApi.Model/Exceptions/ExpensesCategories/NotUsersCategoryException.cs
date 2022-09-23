namespace MoneyStat.WebApi.Model.Exceptions.ExpensesCategories;

public sealed class NotUsersCategoryException : Exception
{
    public NotUsersCategoryException(int categoryId)
        : base($"У пользователя нет категории с id {categoryId}")
    {
    }
}