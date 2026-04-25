using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Models;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IEmailService _email;
    private readonly ILogger<ContactController> _logger;

    public ContactController(IEmailService email, ILogger<ContactController> logger)
    {
        _email  = email;
        _logger = logger;
    }

    /// <summary>Send a contact message from the portfolio form.</summary>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ContactRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            await _email.SendContactEmailAsync(request);
            return Ok(new { message = "Message sent successfully." });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send contact email");
            return StatusCode(500, new { message = "Failed to send email. Please try again later." });
        }
    }
}
