namespace MoneyStat.WebApi.Api.Dto.TransactionCategories;

public record TransactionCategoryDto(string Name, TransactionCategoryDto[] Children, Guid? ParentCategoryId);