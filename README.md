# Michael Czarnecki - Interactive Portfolio v2.5

A modern, highly interactive portfolio website with a "Cyber-Luxe" aesthetic designed for a cybersecurity executive.

## ✨ What's New in v2.5

### 🆕 Dedicated Use Cases Page
- **10 detailed project case studies** extracted from real experience
- Filterable by category (AI Security, Cloud Security, GRC, etc.)
- Featured projects section with metrics
- Detailed modal view with Challenge → Solution → Outcome format
- Dedicated executive brief page for each use case (`/use-cases/:id/brief`)
- Downloadable PDF briefs for each case study
- Technologies used for each project

### 🤖 AI Chatbot Assistant (Secure)
- **Ask questions about Mike's background** in natural language
- Powered by OpenAI GPT-4o-mini via secure serverless function
- API key stored securely on server (never exposed to browser)
- Suggested questions to get started
- Action buttons for 30/60/90 roadmap, AI governance readiness, and board update drafts
- Floating chat widget with beautiful cyber-luxe styling

### Thought Leadership Library
- Read each paper online at `/thought-leadership/:id`
- Download PDF or markdown versions for sharing

### 📍 Multi-Page Navigation
- React Router for proper page navigation
- Separate URLs for Home (`/`) and Use Cases (`/use-cases`)
- Smooth transitions between pages

### 💼 Lead Capture & Qualification
- New **Work With Mike** form for inbound advisory requests
- Captures company size, challenge type, and engagement timeframe
- Powered by `/api/lead` serverless endpoint

### 📈 Engagement Analytics
- Client-side tracking for CTA clicks, chatbot interactions, paper downloads, and use-case brief downloads
- Events stored locally and can forward to `gtag` if configured

## 🚀 Deploy to Vercel (Recommended)

### Step 1: Push to GitHub
1. Create a new GitHub repository
2. Push this code to the repo

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository
4. **Add Environment Variable:**
   - Name: `OPENAI_API_KEY`
   - Value: `sk-your-openai-api-key-here`
5. Click **Deploy**

That's it! Your portfolio will be live with a secure chatbot.

### Why Vercel?
- **Free tier** is plenty for a portfolio
- **Secure API handling** - your OpenAI key stays on the server
- **Automatic HTTPS** and custom domain support
- **Fast global CDN**

## 📁 Project Structure

```
portfolio-react-v2/
├── api/
│   └── chat.js               # Serverless function (holds API key securely)
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Chatbot.jsx       # Chat UI (calls /api/chat)
│   ├── data/
│   │   └── useCases.js       # Project case studies data
│   ├── pages/
│   │   └── UseCases.jsx      # Use cases page component
│   ├── index.jsx             # Entry point with router
│   ├── App.jsx               # Main app with routing
│   └── styles.css            # All styles
├── package.json
├── vercel.json               # Vercel configuration
└── README.md
```

## 🔒 Security Architecture

```
[Browser] → [/api/chat] → [OpenAI API]
              ↑
         API key stored
         here (secure)
```

The API key is **never exposed** to the browser. All requests go through the serverless function which adds the key server-side.

## 🎨 Features

### Home Page
- Animated hero with counting stats
- Credibility strip with trust signals and quantified outcomes
- Expandable experience cards with full details
- Interactive tools explorer with 43 tools across 10 categories
- Flip cards for certifications
- Data visualizations (Radar, Pie, Bar charts)

### Use Cases Page
- 10 detailed project case studies
- Filter by category
- Featured projects highlight
- Modal detail view with metrics
- Executive brief pages and downloadable PDF one-pagers for each project

### AI Chatbot
- Natural language Q&A about Mike
- Pre-loaded with full resume and background
- Suggested starter questions
- Typing indicators and smooth animations

## 📊 Projects Included

1. **Enterprise AI Governance Playbook** - American Express
2. **DevSecOps Transformation Program** - Capital One ($3M savings)
3. **SIEM & MITRE ATT&CK Integration** - Capital One
4. **Enterprise Threat Modeling Framework** - Capital One
5. **SOAR Platform Implementation** - Norges Bank
6. **Quantitative Risk Scoring System** - Norges Bank
7. **FedRAMP & GRC Compliance Program** - VA (100% audit success)
8. **Multi-Cloud Security Enhancement** - Prudential
9. **Incident Response Time Optimization** - Prudential (70% reduction)
10. **Enterprise GRC Platform Migration** - American Express

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Note: Chatbot won't work locally without setting up 
# a local API proxy. Deploy to Vercel for full functionality.
```

## 🔧 Customization

### Add More Use Cases
Edit `src/data/useCases.js` to add projects.

### Update Chatbot Knowledge
Edit `MIKE_PROFILE` in `api/chat.js` to update what the chatbot knows.

### Change AI Model
In `api/chat.js`, change the model:
- `gpt-4o-mini` - Fast & cheap (recommended)
- `gpt-4o` - More capable, higher cost
- `gpt-3.5-turbo` - Cheapest option

## 📱 Contact

- **Email**: mczarneckiitsearch@gmail.com
- **LinkedIn**: [Michael Czarnecki](https://www.linkedin.com/in/michaelczarnecki-421849ab)
- **Location**: New York City Metropolitan Area

---

Built with React, React Router, Recharts, OpenAI, Vercel, and ❤️ for cybersecurity.
