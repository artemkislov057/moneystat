namespace MoneyStat.WebApi.Api.Dto.ExpensesCategories;

public class CategoryDto
{
    /// <summary>
    /// Id созданной категории
    /// </summary>
    public int Id { get; set; }
    
    /// <summary>
    /// Название категории
    /// </summary>
    public string Name { get; set; }
    
    /// <summary>
    /// Id родительской категории
    /// </summary>
    public int? ParentId { get; set; }
    
    /// <summary>
    /// Id пользователя, создавшего категорию
    /// </summary>
    public Guid? UserId { get; set; }
    
    /// <summary>
    /// Подкатегории
    /// </summary>
    public List<CategoryDto>? Subcategories { get; set; }
}