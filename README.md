# 🚀 Manisankar Dixit — Portfolio (React + .NET 8)

A full-stack personal portfolio with a React + Material UI frontend and an ASP.NET Core 8 backend.
Includes a contact form that sends real emails, and a chatbot UI scaffolded for AI integration.

---

## 📁 Project Structure

```
portfolio/
├── frontend/               ← React 18 + MUI v6 app
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx            ← Typing animation, Call + Download icons
│       │   ├── Sections.jsx        ← About, Experience, Skills, Certs, Awards, Education, Contact, Footer
│       │   ├── ContactModal.jsx    ← Email form → calls backend
│       │   ├── ChatbotFAB.jsx      ← Floating chatbot UI (AI-ready)
│       │   └── ParticleCanvas.jsx  ← Animated background
│       ├── data/
│       │   └── resumeData.js       ← ✏️ Edit this file to update all content
│       ├── services/
│       │   └── api.js              ← Axios wrapper for backend calls
│       ├── theme.js                ← MUI dark theme
│       └── App.jsx
└── backend/
    └── PortfolioApi/
        ├── Controllers/
        │   ├── ContactController.cs  ← POST /api/contact
        │   └── ChatController.cs     ← POST /api/chat (AI-ready stub)
        ├── Models/
        │   └── ContactRequest.cs
        ├── Services/
        │   └── EmailService.cs       ← MailKit SMTP
        ├── Program.cs
        └── appsettings.json
```

---

## ⚡ Prerequisites

| Tool         | Minimum Version | Download |
|--------------|-----------------|---------|
| Node.js      | 18+             | https://nodejs.org |
| .NET SDK     | 8.0             | https://dotnet.microsoft.com/download |
| Git          | any             | https://git-scm.com |

---

## 🛠️ Local Development Setup

### Step 1 — Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
```

---

### Step 2 — Configure Email (Gmail App Password)

Gmail is pre-configured. To enable real email sending:

1. Go to your Google Account → **Security → 2-Step Verification** (must be ON)
2. Search for **"App passwords"** → Create one → copy the 16-char password
3. Open `backend/PortfolioApi/appsettings.json` and fill in:

```json
"Email": {
  "SmtpHost":     "smtp.gmail.com",
  "SmtpPort":     "587",
  "SmtpUser":     "youremail@gmail.com",
  "SmtpPassword": "xxxx xxxx xxxx xxxx",
  "ToAddress":    "manisankardixit@gmail.com"
}
```

> ⚠️ **Never commit appsettings with real passwords.** Use environment variables or Azure Key Vault in production.

---

### Step 3 — Run the backend

```bash
cd backend/PortfolioApi
dotnet restore
dotnet run
```

Backend starts at: `http://localhost:5000`  
Swagger UI at: `http://localhost:5000/swagger`

---

### Step 4 — Run the frontend

```bash
cd frontend
npm install
npm start
```

Frontend starts at: `http://localhost:3000`  
The `"proxy": "http://localhost:5000"` in package.json forwards `/api/*` to the backend automatically.

---

### Step 5 — Update your content

All text content lives in one file — edit it and the whole site updates:

```
frontend/src/data/resumeData.js
```

---

## 🌐 Deployment

---

### Option A — Render (Recommended · Free Tier)

**Backend on Render:**

1. Push code to GitHub
2. Go to https://render.com → New → **Web Service**
3. Connect your GitHub repo → Select `backend/PortfolioApi`
4. Settings:
   - **Runtime:** Docker  *(or .NET)*
   - **Build Command:** `dotnet publish -c Release -o out`
   - **Start Command:** `dotnet out/PortfolioApi.dll`
5. Add **Environment Variables** in Render dashboard:
   ```
   Email__SmtpUser      = youremail@gmail.com
   Email__SmtpPassword  = your_app_password
   Email__ToAddress     = manisankardixit@gmail.com
   AllowedOrigins__0    = https://your-frontend-url.vercel.app
   ```
6. Copy your Render backend URL (e.g. `https://portfolio-api.onrender.com`)

**Frontend on Vercel:**

1. Go to https://vercel.com → New Project → import your repo
2. Set **Root Directory** to `frontend`
3. Add **Environment Variable**:
   ```
   REACT_APP_API_URL = https://portfolio-api.onrender.com/api
   ```
4. Deploy → done ✅

---

### Option B — Azure (Professional)

**Backend → Azure App Service:**

```bash
cd backend/PortfolioApi

# Login
az login

# Create resource group
az group create --name portfolio-rg --location southeastasia

# Create App Service plan (free tier)
az appservice plan create --name portfolio-plan --resource-group portfolio-rg --sku F1 --is-linux

# Create web app
az webapp create --name manisankar-api --resource-group portfolio-rg \
  --plan portfolio-plan --runtime "DOTNETCORE:8.0"

# Set environment variables (secrets)
az webapp config appsettings set --name manisankar-api --resource-group portfolio-rg --settings \
  Email__SmtpUser="youremail@gmail.com" \
  Email__SmtpPassword="your_app_password" \
  Email__ToAddress="manisankardixit@gmail.com" \
  AllowedOrigins__0="https://your-frontend-url.vercel.app"

# Publish
dotnet publish -c Release -o ./publish
cd publish && zip -r ../deploy.zip .
az webapp deployment source config-zip \
  --name manisankar-api --resource-group portfolio-rg --src ../deploy.zip
```

**Frontend → Azure Static Web Apps:**

1. Azure Portal → Create **Static Web App**
2. Connect GitHub repo → set app location to `/frontend`, output to `build`
3. Add environment variable `REACT_APP_API_URL` pointing to your App Service URL

---

### Option C — Railway (Simplest)

1. https://railway.app → New Project → Deploy from GitHub
2. Add two services: one for `backend/PortfolioApi`, one for `frontend`
3. Set env vars in the Railway dashboard (same as Render above)
4. Railway auto-detects .NET and Node.js — no config needed

---

## 🤖 Integrating the AI Chatbot (Future)

The chatbot UI is fully built. To wire it to a real AI:

**Backend** — open `Controllers/ChatController.cs` and replace the stub:

```csharp
// 1. Install: dotnet add package Azure.AI.OpenAI
// 2. Add to appsettings.json: "OpenAI": { "ApiKey": "...", "Model": "gpt-4o-mini" }

var client = new OpenAIClient(config["OpenAI:ApiKey"]);
var chatClient = client.GetChatClient(config["OpenAI:Model"]);

var messages = request.Messages
    .Select(m => m.Role == "user"
        ? ChatMessage.CreateUserMessage(m.Content)
        : ChatMessage.CreateAssistantMessage(m.Content))
    .ToList();

// Optional: prepend a system prompt about Manisankar
messages.Insert(0, ChatMessage.CreateSystemMessage(
    "You are a helpful assistant for Manisankar Dixit's portfolio. " +
    "Answer questions about his experience, skills, and projects professionally."));

var result = await chatClient.CompleteChatAsync(messages);
return Ok(new { reply = result.Value.Content[0].Text });
```

**Frontend** — open `services/api.js` and uncomment:

```js
export const sendChatMessage = (messages) =>
  api.post('/chat', { messages });
```

Then in `ChatbotFAB.jsx`, replace the stub block with:

```js
import { sendChatMessage } from '../services/api';
const res = await sendChatMessage([...messages, userMsg]);
const reply = res.data.reply;
```

---

## 📧 Email Flow

```
User fills ContactModal
        ↓
POST /api/contact  { senderName, senderEmail, subject, message }
        ↓
EmailService.cs  (MailKit → Gmail SMTP)
        ↓
Beautiful HTML email lands in manisankardixit@gmail.com
Reply-To is set to the sender's email → just hit Reply to respond
```

---

## 🔑 Environment Variables Reference

| Variable               | Where             | Description                        |
|------------------------|-------------------|------------------------------------|
| `Email__SmtpUser`      | Backend           | Gmail address used to send emails  |
| `Email__SmtpPassword`  | Backend           | Gmail App Password (not your login)|
| `Email__ToAddress`     | Backend           | Where contact emails are delivered |
| `AllowedOrigins__0`    | Backend           | Frontend URL (for CORS)            |
| `REACT_APP_API_URL`    | Frontend          | Full backend API base URL          |

---

## ✏️ Keeping Content Fresh

| What to update             | File                            |
|----------------------------|---------------------------------|
| Personal info / summary    | `src/data/resumeData.js`        |
| Job experience             | `src/data/resumeData.js`        |
| Skills                     | `src/data/resumeData.js`        |
| Colors / theme             | `src/theme.js`                  |
| Email template design      | `Services/EmailService.cs`      |
| Chatbot system prompt      | `Controllers/ChatController.cs` |

---

## 🛡️ Security Notes

- Never commit real credentials — use env vars always
- The `.gitignore` excludes `appsettings.Production.json` and `.env` files
- Add rate limiting to `/api/contact` before going live (see [AspNetCoreRateLimit](https://github.com/stefanprodan/AspNetCoreRateLimit))
- Consider adding reCAPTCHA to the contact form for spam protection
