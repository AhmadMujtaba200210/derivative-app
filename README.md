<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# QuantFlow: Derivatives Mastery

An interactive learning platform for options, futures, and derivatives based on Hull's standard curriculum.

## 🔒 Security

This application implements production-grade security measures:
- ✅ No API keys exposed in client-side code
- ✅ XSS protection with DOMPurify
- ✅ Input validation and sanitization
- ✅ Rate limiting on API requests
- ✅ Secure backend API proxy

See [SECURITY.md](./SECURITY.md) for detailed security documentation.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Gemini API key ([Get one here](https://aistudio.google.com/apikey))

### Setup

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   
   Create `.env.local` in the project root:
   ```bash
   # Backend Configuration
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3001
   FRONTEND_URL=http://localhost:3000
   
   # Frontend Configuration
   VITE_API_URL=http://localhost:3001
   ```

3. **Run the application**
   ```bash
   npm run dev
   ```
   
   This starts:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📚 Features

- Interactive derivatives curriculum based on Hull's textbook
- Real-time option payoff visualization
- Live Greeks calculations (Delta, Gamma, Theta, Vega, Rho)
- AI-powered Quant Mentor for Q&A
- Black-Scholes pricing model implementation

## 🛠️ Development

```bash
# Run frontend only
npm run dev:frontend

# Run backend only
npm run dev:backend

# Build for production
npm run build
npm run build:backend
```

## 📖 Learn More

- [Security Documentation](./SECURITY.md)
- [Hull's Options, Futures, and Other Derivatives](https://www.pearson.com/en-us/subject-catalog/p/options-futures-and-other-derivatives/P200000005938)

## 📄 License

MIT
