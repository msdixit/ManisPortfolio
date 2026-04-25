using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public class ContactRequest
{
    [Required, MinLength(2)]
    public string SenderName  { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string SenderEmail { get; set; } = string.Empty;

    [Required, MinLength(3)]
    public string Subject     { get; set; } = string.Empty;

    [Required, MinLength(10)]
    public string Message     { get; set; } = string.Empty;
}

// Future chatbot model
public class ChatRequest
{
    public List<ChatMessage> Messages { get; set; } = new List<ChatMessage>();
}

public class ChatMessage
{
    public string Role    { get; set; } = "user";   // "user" | "assistant"
    public string Content { get; set; } = string.Empty;
}
