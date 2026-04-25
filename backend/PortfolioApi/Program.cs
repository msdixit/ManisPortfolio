using PortfolioApi.Services;

var builder = WebApplication.CreateBuilder(args);

// ── Services ──────────────────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title       = "Manisankar Dixit — Portfolio API",
        Version     = "v1",
        Description = "Backend API for portfolio contact form and AI chatbot.",
    });
});

// ── Email service ─────────────────────────────────────────────────────────
builder.Services.AddTransient<IEmailService, EmailService>();

// ── CORS — allow React dev server + production domain ────────────────────
var allowedOrigins = builder.Configuration
    .GetSection("AllowedOrigins")
    .Get<string[]>() ?? new string[] { "http://localhost:3000" };

builder.Services.AddCors(opt =>
    opt.AddPolicy("PortfolioCors", policy =>
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()));

// ── Rate limiting (basic in-memory) ──────────────────────────────────────
builder.Services.AddMemoryCache();

var app = builder.Build();

// ── Middleware pipeline ───────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("PortfolioCors");
app.UseAuthorization();
app.MapControllers();

// ── Health check ──────────────────────────────────────────────────────────
app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }));

// ── Serve React build in production ──────────────────────────────────────
if (!app.Environment.IsDevelopment())
{
    app.UseDefaultFiles();
    app.UseStaticFiles();
    // SPA fallback — must be LAST
    app.MapFallbackToFile("index.html");
}

app.Run();
