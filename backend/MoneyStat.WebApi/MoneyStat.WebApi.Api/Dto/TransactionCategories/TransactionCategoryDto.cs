namespace MoneyStat.WebApi.Api.Dto.TransactionCategories;

public record TransactionCategoryDto(Guid Id, string Name, TransactionCategoryDto[] Children, Guid? ParentCategoryId);