namespace MoneyStat.DataBase.Entities;

public class TransactionCategory
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid? ParentTransactionCategoryId { get; set; }
    public string Name { get; set; }
}