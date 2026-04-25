using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

/// <summary>
/// Chatbot endpoint — ready for AI integration.
/// 
/// To connect a real LLM:
///   1. Add your AI SDK (e.g. Azure.AI.OpenAI, Anthropic SDK, etc.)
///   2. Inject an IChatService here
///   3. Replace the stub response with the real AI call
///   4. Optionally add a system prompt that describes Manisankar's profile
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly ILogger<ChatController> _logger;

    public ChatController(ILogger<ChatController> logger) => _logger = logger;

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ChatRequest request)
    {
        if (request.Messages == null || request.Messages.Count == 0)
            return BadRequest(new { message = "Messages array is required." });

        // ── TODO: Plug in your AI service here ──────────────────────────
        // Example with OpenAI:
        //   var client = new OpenAIClient(config["OpenAI:ApiKey"]);
        //   var completion = await client.GetChatCompletionsAsync(...);
        //   return Ok(new { reply = completion.Value.Choices[0].Message.Content });
        // ────────────────────────────────────────────────────────────────

        await Task.CompletedTask; // placeholder async

        _logger.LogInformation("Chat request received with {Count} messages", request.Messages.Count);

        return Ok(new
        {
            reply = "Hi! I'm Mani's assistant. Full AI integration is coming soon. " +
                    "In the meantime, use the Contact Me form to reach out directly.",
        });
    }
}
