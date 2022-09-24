namespace MoneyStat.DataBase.Entities;

public class ExpensesCategory
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int ParentId { get; set; }
    public bool IsParentBase { get; set; }
    public Guid UserId { get; set; }
}