using MoneyStat.Infra.Helpers;

namespace MoneyStat.WebApi.Model.Exceptions.ExpensesCategories;

public sealed class NotUsersCategoryException : BadRequestException
{
    public NotUsersCategoryException(int categoryId)
        : base($"У пользователя нет категории с id {categoryId}")
    {
    }
}