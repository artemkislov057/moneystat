﻿using System.ComponentModel.DataAnnotations;

namespace MoneyStat.WebApi.Api.Dto.ExpensesCategories;

public class PostCategoryRequestDto
{
    /// <summary>
    /// Название категории
    /// </summary>
    [Required]
    public string Name { get; set; }
    
    /// <summary>
    /// Id родительской категории
    /// </summary>
    [Required]
    public int? ParentId { get; set; }
    
    /// <summary>
    /// Добавить в основную категорию или в подкатегорию
    /// </summary>
    [Required]
    public bool? IsParentBase { get; set; }
}