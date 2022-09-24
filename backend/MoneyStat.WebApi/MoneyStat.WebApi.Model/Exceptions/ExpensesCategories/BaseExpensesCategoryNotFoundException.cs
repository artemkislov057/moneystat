using MoneyStat.Infra.Helpers;

namespace MoneyStat.WebApi.Model.Exceptions.ExpensesCategories;

public class BaseExpensesCategoryNotFoundException : BadRequestException
{
    public BaseExpensesCategoryNotFoundException(int categoryId)
        : base($"Основная категория с id {categoryId} не существует")
    {
    }
}