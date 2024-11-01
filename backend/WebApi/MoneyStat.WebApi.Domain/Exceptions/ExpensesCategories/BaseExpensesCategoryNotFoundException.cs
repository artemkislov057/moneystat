using MoneyStat.Infra.Helpers;

namespace MoneyStat.WebApi.Domain.Exceptions.ExpensesCategories;

public class BaseExpensesCategoryNotFoundException : BadRequestException
{
    public BaseExpensesCategoryNotFoundException(int categoryId)
        : base($"Основная категория с id {categoryId} не существует")
    {
    }
}