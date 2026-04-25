using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using PortfolioApi.Models;

namespace PortfolioApi.Services;

// ── Interface ─────────────────────────────────────────────────────────────
public interface IEmailService
{
    Task SendContactEmailAsync(ContactRequest request);
}

// ── Implementation ────────────────────────────────────────────────────────
public class EmailService : IEmailService
{
    private readonly IConfiguration _config;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration config, ILogger<EmailService> logger)
    {
        _config = config;
        _logger = logger;
    }

    public async Task SendContactEmailAsync(ContactRequest req)
    {
        var smtpHost = _config["Email:SmtpHost"]     ?? "smtp.gmail.com";
        var smtpPort = int.Parse(_config["Email:SmtpPort"] ?? "587");
        var smtpUser = _config["Email:SmtpUser"]     ?? throw new InvalidOperationException("Email:SmtpUser not configured");
        var smtpPass = _config["Email:SmtpPassword"] ?? throw new InvalidOperationException("Email:SmtpPassword not configured");
        var toEmail  = _config["Email:ToAddress"]    ?? smtpUser;

        // ── Build the email ──────────────────────────────────────────────
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Portfolio Contact Form", smtpUser));
        message.To.Add(new MailboxAddress("Manisankar Dixit", toEmail));
        message.ReplyTo.Add(new MailboxAddress(req.SenderName, req.SenderEmail));
        message.Subject = $"[Portfolio] {req.Subject}";

        var body = new BodyBuilder
        {
            HtmlBody = BuildHtml(req),
            TextBody = BuildText(req),
        };
        message.Body = body.ToMessageBody();

        // ── Send ────────────────────────────────────────────────────────
        using var client = new SmtpClient();
        await client.ConnectAsync(smtpHost, smtpPort, SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(smtpUser, smtpPass);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);

        _logger.LogInformation("Contact email sent from {Email}", req.SenderEmail);
    }

    // ── HTML email template ───────────────────────────────────────────────
    private static string BuildHtml(ContactRequest req)
    {
        var messageWithBreaks = req.Message.Replace("\n", "<br/>");
        return "<!DOCTYPE html>" +
            "<html>" +
            "<head>" +
            "  <meta charset=\"utf-8\"/>" +
            "  <style>" +
            "    body { font-family: 'DM Sans', Arial, sans-serif; background:#f4f6fb; margin:0; padding:0; }" +
            "    .wrap { max-width:580px; margin:32px auto; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,.08); }" +
            "    .header { background:linear-gradient(135deg,#7f5af0,#00c2ff); padding:32px 36px; }" +
            "    .header h1 { color:#fff; margin:0; font-size:22px; }" +
            "    .header p  { color:rgba(255,255,255,.8); margin:6px 0 0; font-size:13px; }" +
            "    .body { padding:32px 36px; }" +
            "    .field { margin-bottom:20px; }" +
            "    .label { font-size:11px; text-transform:uppercase; letter-spacing:.1em; color:#7f5af0; font-weight:700; margin-bottom:6px; }" +
            "    .value { font-size:15px; color:#1a1a2e; line-height:1.6; }" +
            "    .msg-box { background:#f9f9ff; border-left:3px solid #7f5af0; border-radius:6px; padding:16px 18px; }" +
            "    .footer { text-align:center; padding:18px; font-size:12px; color:#aaa; border-top:1px solid #eee; }" +
            "  </style>" +
            "</head>" +
            "<body>" +
            "  <div class=\"wrap\">" +
            "    <div class=\"header\">" +
            "      <h1>📬 New Portfolio Message</h1>" +
            "      <p>Someone reached out via your portfolio contact form</p>" +
            "    </div>" +
            "    <div class=\"body\">" +
            "      <div class=\"field\"><div class=\"label\">From</div><div class=\"value\">" + req.SenderName + " &lt;" + req.SenderEmail + "&gt;</div></div>" +
            "      <div class=\"field\"><div class=\"label\">Subject</div><div class=\"value\">" + req.Subject + "</div></div>" +
            "      <div class=\"field\">" +
            "        <div class=\"label\">Message</div>" +
            "        <div class=\"value msg-box\">" + messageWithBreaks + "</div>" +
            "      </div>" +
            "    </div>" +
            "    <div class=\"footer\">Sent via manisankar.dev portfolio · Reply directly to " + req.SenderEmail + "</div>" +
            "  </div>" +
            "</body>" +
            "</html>";
    }

    private static string BuildText(ContactRequest req) =>
        "From: " + req.SenderName + " <" + req.SenderEmail + ">\nSubject: " + req.Subject + "\n\n" + req.Message;
}
