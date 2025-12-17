# NewsAI - AI-Powered Personalized News Aggregator

<div align="center">

![NewsAI](https://img.shields.io/badge/NewsAI-v0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**Your Personalized AI-First News Feed**

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [AI Integration](#ai-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

**NewsAI** is a modern, AI-powered news aggregation platform that delivers personalized news feeds based on your interests. Built with Next.js 15, it combines real-time news from thousands of sources with Google's Gemini AI to provide intelligent summaries and interactive chat capabilities.

### Key Highlights

- 🎯 **Personalized News Feed**: Subscribe to topics that matter to you
- 🤖 **AI-Powered Summaries**: Get intelligent summaries of your news feed using Gemini AI
- 💬 **Interactive AI Chat**: Ask questions about news articles and get contextual answers
- 🔍 **Advanced Search**: Explore news with country and language filters
- 🌍 **Global Coverage**: Access news from 10+ countries in 9+ languages
- 🔐 **Secure Authentication**: Multiple auth options including Google OAuth and email/password
- 🎨 **Modern UI**: Beautiful, responsive design with dark mode support
- ⚡ **Real-time Updates**: Stay informed with the latest news

---

## ✨ Features

### 🎯 Core Features

#### 1. **Personalized News Feed**
- Subscribe to 15+ topics including Technology, Business, Science, Health, Sports, Entertainment, Politics, and more
- Curated feed based on your selected interests
- Real-time news updates from trusted sources worldwide
- Beautiful card-based layout with images and metadata

#### 2. **AI-Powered Summaries**
- Automatic generation of comprehensive news summaries using Google Gemini 2.5 Flash
- Highlights main topics, trends, and patterns
- Provides context and connections between different stories
- 700-800 word concise summaries

#### 3. **Interactive AI Chat**
- Chat with AI about your news feed
- Ask questions and get contextual answers
- Conversation history maintained during session
- Powered by Google Gemini AI

#### 4. **Advanced Explore Mode**
- Search for specific news topics and keywords
- Filter by country (10+ countries supported)
- Filter by language (9+ languages supported)
- Custom search with up to 30 results

#### 5. **User Management**
- Secure authentication with NextAuth.js
- Multiple sign-in options:
  - Email/Password with verification
  - Google OAuth
- Password reset functionality
- Email verification system
- Protected routes with middleware

### 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Mode**: Full dark mode support with system preference detection
- **Smooth Animations**: Micro-interactions for enhanced user experience
- **Modern Landing Page**: Beautiful hero section, features showcase, FAQ, and footer
- **Sidebar Navigation**: Easy navigation between Feed, Explore, and AI Summary
- **Floating Action Button**: Quick access to AI Summary from anywhere

### 🔧 Technical Features

- **Server-Side Rendering**: Fast page loads with Next.js SSR
- **API Routes**: RESTful API endpoints for all operations
- **Database Integration**: PostgreSQL with Drizzle ORM
- **Type Safety**: Full TypeScript implementation
- **Form Validation**: Zod schema validation
- **Error Handling**: Comprehensive error handling and user feedback
- **Toast Notifications**: User-friendly notifications with Sonner

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 15.3.1](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript 5.x](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Forms**: [React Hook Form](https://react-hook-form.com/) - Performant form library
- **Validation**: [Zod](https://zod.dev/) - TypeScript-first schema validation
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) - Toast notifications
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) - JavaScript runtime
- **API**: Next.js API Routes - Serverless functions
- **Authentication**: [NextAuth.js 5.0](https://next-auth.js.org/) - Authentication solution
- **Database**: [PostgreSQL](https://www.postgresql.org/) - Relational database
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- **Password Hashing**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - Password encryption
- **Email**: [Nodemailer](https://nodemailer.com/) - Email sending

### External APIs
- **News API**: [GNews API](https://gnews.io/) - News aggregation service
- **AI**: [Google Gemini 2.5 Flash](https://ai.google.dev/) - AI summaries and chat
- **OAuth**: Google OAuth 2.0 - Social authentication

### Development Tools
- **Package Manager**: [pnpm](https://pnpm.io/) - Fast, disk space efficient
- **Linting**: [ESLint](https://eslint.org/) - Code quality
- **Database Migrations**: Drizzle Kit - Schema migrations

---

## 🏗 Architecture

### Application Structure

```
NewsAI/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Authentication routes (grouped)
│   │   │   ├── signin/          # Sign in page
│   │   │   ├── signup/          # Sign up page
│   │   │   ├── forgot-password/ # Password reset request
│   │   │   ├── reset-password/  # Password reset form
│   │   │   └── verify-mail/     # Email verification
│   │   ├── (protected)/         # Protected routes (require auth)
│   │   │   ├── news/            # Main news feed page
│   │   │   ├── ai-summary/      # AI summary & chat page
│   │   │   ├── dashboard/       # Topic management dashboard
│   │   │   └── onboard/         # Initial topic selection
│   │   ├── api/                 # API routes
│   │   │   ├── (auth)/          # Auth API endpoints
│   │   │   ├── ai/              # AI endpoints (summary, chat)
│   │   │   ├── news/            # News fetching endpoint
│   │   │   └── topics/          # Topic subscription endpoints
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Landing page
│   ├── components/              # React components
│   │   ├── auth/                # Authentication components
│   │   ├── landing/             # Landing page components
│   │   └── ui/                  # Reusable UI components
│   ├── db/                      # Database
│   │   ├── schema.ts            # Database schema
│   │   ├── index.ts             # Database connection
│   │   └── migrations/          # Database migrations
│   ├── lib/                     # Utility functions
│   │   ├── schema.ts            # Zod validation schemas
│   │   ├── userQueries.ts       # User database queries
│   │   ├── token.ts             # Token generation/validation
│   │   ├── mail.ts              # Email sending utilities
│   │   ├── constants.ts         # App constants
│   │   └── utils.ts             # Helper functions
│   ├── auth.ts                  # NextAuth configuration
│   ├── auth.config.ts           # Auth providers config
│   ├── middleware.ts            # Route protection middleware
│   └── routes.ts                # Route definitions
├── public/                      # Static assets
├── .env                         # Environment variables
├── drizzle.config.ts           # Drizzle ORM configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies

```

### Data Flow

1. **User Authentication**
   - User signs up/signs in via NextAuth.js
   - Credentials or OAuth (Google) authentication
   - Session stored with JWT strategy
   - Middleware protects routes

2. **Topic Subscription**
   - User selects topics on onboarding
   - Topics stored in PostgreSQL via Drizzle ORM
   - Can be managed from dashboard

3. **News Fetching**
   - API route fetches news from GNews API
   - Filters by user's subscribed topics
   - Supports feed mode (topics) and explore mode (search)
   - Returns deduplicated, sorted articles

4. **AI Processing**
   - News articles sent to Gemini API
   - AI generates comprehensive summaries
   - Chat maintains conversation context
   - Responses streamed back to client

---
## 📁 Project Structure

### Key Directories

#### `/src/app`
Contains all Next.js pages and API routes using the App Router.

- **(auth)**: Route group for authentication pages (signin, signup, etc.)
- **(protected)**: Route group for authenticated pages (news, dashboard, etc.)
- **api**: Backend API endpoints

#### `/src/components`
Reusable React components organized by feature.

- **auth**: Authentication forms and UI
- **landing**: Landing page sections (hero, features, FAQ, footer)
- **ui**: Shadcn UI components (button, card, form, etc.)

#### `/src/db`
Database configuration and schema.

- **schema.ts**: Drizzle ORM schema definitions
- **migrations**: Auto-generated migration files

#### `/src/lib`
Utility functions and helpers.

- **schema.ts**: Zod validation schemas
- **userQueries.ts**: Database query functions
- **token.ts**: Token generation and validation
- **mail.ts**: Email sending utilities

---

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/(auth)/signup`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Verification email sent"
}
```

#### POST `/api/(auth)/signin`
Sign in with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST `/api/(auth)/forgot-password`
Request password reset email.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

#### POST `/api/(auth)/reset-password`
Reset password with token.

**Request Body:**
```json
{
  "token": "reset-token",
  "password": "newpassword123"
}
```

#### POST `/api/(auth)/verify-mail`
Verify email address with token.

**Request Body:**
```json
{
  "token": "verification-token"
}
```

### News Endpoints

#### GET `/api/news`
Fetch news articles.

**Query Parameters:**
- `mode`: "feed" or "explore" (required)
- `topics`: Comma-separated topics (required for feed mode)
- `q`: Search query (required for explore mode)
- `country`: Country code (default: "us")
- `lang`: Language code (default: "en")

**Example (Feed Mode):**
```
GET /api/news?mode=feed&topics=Technology,Business&country=us&lang=en
```

**Example (Explore Mode):**
```
GET /api/news?mode=explore&q=artificial%20intelligence&country=us&lang=en
```

**Response:**
```json
{
  "articles": [
    {
      "title": "Article Title",
      "description": "Article description...",
      "url": "https://example.com/article",
      "image": "https://example.com/image.jpg",
      "publishedAt": "2024-01-01T12:00:00Z",
      "source": {
        "name": "Source Name",
        "url": "https://example.com"
      }
    }
  ],
  "totalArticles": 25
}
```

### Topic Endpoints

#### GET `/api/topics/subscribe`
Get user's subscribed topics.

**Response:**
```json
{
  "topics": ["Technology", "Business", "Science"]
}
```

#### POST `/api/topics/subscribe`
Subscribe to topics.

**Request Body:**
```json
{
  "topics": ["Technology", "Business", "Science"],
  "action": "replace"  // or "add" or "remove"
}
```

**Response:**
```json
{
  "success": true,
  "topics": ["Technology", "Business", "Science"]
}
```

### AI Endpoints

#### POST `/api/ai/summary`
Generate AI summary of news articles.

**Request Body:**
```json
{
  "newsArticles": [
    {
      "title": "Article Title",
      "description": "Description...",
      "source": { "name": "Source" },
      "publishedAt": "2024-01-01T12:00:00Z",
      "url": "https://example.com"
    }
  ]
}
```

**Response:**
```json
{
  "summary": "Comprehensive AI-generated summary...",
  "articleCount": 25
}
```

#### POST `/api/ai/chat`
Chat with AI about news.

**Request Body:**
```json
{
  "message": "What are the main topics in today's news?",
  "newsContext": [...],  // Array of news articles
  "chatHistory": [
    {
      "role": "user",
      "content": "Previous message"
    },
    {
      "role": "assistant",
      "content": "Previous response"
    }
  ]
}
```

**Response:**
```json
{
  "reply": "AI-generated response..."
}
```

---

## 🔐 Authentication

NewsAI uses **NextAuth.js v5** for authentication with the following features:

### Authentication Methods

1. **Email/Password**
   - User registration with email verification
   - Secure password hashing with bcryptjs
   - Password reset via email

2. **Google OAuth**
   - One-click sign-in with Google
   - Automatic account linking

### Authentication Flow

1. User signs up or signs in
2. Session created with JWT strategy
3. Middleware protects routes
4. Session available in server and client components

### Protected Routes

Routes under `(protected)` group require authentication:
- `/news` - News feed
- `/ai-summary` - AI summary and chat
- `/dashboard` - Topic management
- `/onboard` - Initial setup

### Route Configuration

**Public Routes** (`src/routes.ts`):
- `/` - Landing page
- `/new-verification` - Email verification

**Auth Routes** (redirect if logged in):
- `/signin`
- `/signup`
- `/forgot-password`
- `/reset-password`
- `/verify-mail`

---

## 🗄 Database Schema

### Users Table
Stores user account information.

```typescript
{
  id: string (UUID, primary key)
  name: string
  email: string (unique)
  password: string (hashed)
  emailVerified: timestamp
  image: string
}
```

### Accounts Table
OAuth provider accounts.

```typescript
{
  userId: string (foreign key)
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string
  access_token: string
  expires_at: integer
  token_type: string
  scope: string
  id_token: string
  session_state: string
}
```

### Subscribed Topics Table
User topic subscriptions.

```typescript
{
  id: string (UUID, primary key)
  userId: string (foreign key)
  topic: string
  createdAt: timestamp
}
```

### Verification Tokens Table
Email verification tokens.

```typescript
{
  id: string (UUID, primary key)
  email: string
  token: string
  expires: timestamp
}
```

### Password Reset Tokens Table
Password reset tokens.

```typescript
{
  id: string (UUID, primary key)
  email: string
  token: string (unique)
  expires: timestamp
}
```

---

## 🤖 AI Integration

### Google Gemini 2.5 Flash

NewsAI integrates Google's Gemini 2.5 Flash model for:

#### 1. News Summaries
- Analyzes multiple news articles
- Identifies main topics and trends
- Provides context and connections
- Generates 700-800 word summaries

**Configuration:**
```typescript
{
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1024
}
```

#### 2. Interactive Chat
- Context-aware conversations
- Answers questions about news
- Maintains chat history
- Uses news articles as context

**Configuration:**
```typescript
{
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048
}
```

### System Instructions

The AI is configured with specific personas:

**Summary Persona:**
```
You are an expert news analyst.
Provide a comprehensive summary that:
1. Highlights the main topics and themes
2. Identifies key trends and patterns
3. Provides context and connections between different stories
4. Keeps the summary concise but informative (around 700-800 words)
```

**Chat Persona:**
```
You are a helpful news assistant.
You have access to the provided news articles (News Context).
Use them to answer questions accurately.
If the answer isn't in the context, use your general knowledge but mention that it's outside the provided news.
Be informative, accurate, and concise.
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Environment Variables**
   Add all variables from `.env` to Vercel:
   - Go to Project Settings → Environment Variables
   - Add each variable

4. **Database**
   - Use a hosted PostgreSQL service (e.g., Neon, Supabase, Railway)
   - Update `DATABASE_URL` in Vercel environment variables


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Vercel** - Hosting and deployment
- **Google** - Gemini AI API
- **GNews** - News aggregation API
- **Radix UI** - Accessible components
- **Tailwind CSS** - Styling framework

---
## 🗺 Roadmap

<div align="center">

**Made with ❤️ by the NewsAI Team**

[Website](https://newsai.com) • [Twitter](https://twitter.com/newsai) • [Discord](https://discord.gg/newsai)

</div>
