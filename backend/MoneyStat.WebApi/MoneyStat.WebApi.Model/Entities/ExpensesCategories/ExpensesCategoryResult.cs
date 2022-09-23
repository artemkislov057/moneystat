namespace MoneyStat.WebApi.Model.Entities.ExpensesCategories;

public class ExpensesCategoryResult
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int? ParentId { get; set; }
    public Guid? UserId { get; set; }
    public List<ExpensesCategoryResult> Subcategories { get; set; } = new();
}