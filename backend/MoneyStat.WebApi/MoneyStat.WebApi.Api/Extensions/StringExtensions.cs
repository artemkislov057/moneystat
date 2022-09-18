using System.Text.RegularExpressions;

namespace MoneyStat.WebApi.Api.Extensions;

public static class StringExtensions
{
    public static string PascalToKebabCase(this string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return value;
        }

        return Regex.Replace(
                value,
                "(?<!^)([A-Z][a-z]|(?<=[a-z])[A-Z])",
                "-$1",
                RegexOptions.Compiled)
            .Trim()
            .ToLower();
    }

    public static string RemoveLastSubstring(this string value, string substring)
    {
        if (string.IsNullOrWhiteSpace(value) || !value.EndsWith(substring, StringComparison.OrdinalIgnoreCase))
        {
            return value;
        }

        return value[..value.LastIndexOf(substring, StringComparison.OrdinalIgnoreCase)];
    }
}