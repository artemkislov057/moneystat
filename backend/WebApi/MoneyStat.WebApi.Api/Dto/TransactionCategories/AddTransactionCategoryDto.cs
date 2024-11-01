namespace MoneyStat.WebApi.Api.Dto.TransactionCategories;

public record AddTransactionCategoryDto(string Name, Guid? ParentTransactionCategoryId);