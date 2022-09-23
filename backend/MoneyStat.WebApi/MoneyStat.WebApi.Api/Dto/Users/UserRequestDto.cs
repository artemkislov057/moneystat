using System.ComponentModel.DataAnnotations;

namespace MoneyStat.WebApi.Api.Dto.Users;

public class UserRequestDto
{
    [Required]
    public string Email { get; set; }
    
    [Required]
    public string Password { get; set; }
}