namespace MoneyStat.DataBase.Entities;

public class Transaction
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public Guid TransactionCategoryId { get; set; }
    public decimal Amount { get; set; }
    public bool IsIncome { get; set; }
    public DateTime Date { get; set; }
    public string? Comment { get; set; }
}