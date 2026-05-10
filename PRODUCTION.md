# Production Deployment Guide: FLEXzcart on Render.com

This guide provides step-by-step instructions for deploying the **FLEXzcart** project to Render.com as a production-ready application using the provided Docker monolith configuration.

## 1. Prepare Your External Services

Before deploying, ensure you have production accounts and API keys for the following services:

- **Database**: A PostgreSQL instance (e.g., [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or Render's Managed Postgres).
- **Authentication**: [Clerk](https://clerk.com/) (Production instance).
- **Media Storage**: [ImageKit](https://imagekit.io/).
- **Chat/Video**: [GetStream](https://getstream.io/).
- **Error Tracking**: [Sentry](https://sentry.io/).

---

## 2. Deployment on Render.com

### Step A: Create a New Web Service
1. Log in to [Render.com](https://dashboard.render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository `FLEXzcart`.

### Step B: Configure Build Settings
- **Name**: `flexzcart` (or your preferred name).
- **Region**: Select the region closest to your users.
- **Language**: `Docker`.
- **Branch**: `main`.

### Step C: Environment Variables (Critical)
Add the following environment variables in the Render dashboard under the **Environment** tab:

#### Backend Environment Variables (Runtime)
| Key | Value Description |
|-----|-------------------|
| `PORT` | `3001` (Render usually maps this automatically, but set it explicitly if needed) |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Your production PostgreSQL connection string (must include `sslmode=require`) |
| `CLERK_SECRET_KEY` | Your production Clerk Secret Key (`sk_live_...`) |
| `SENTRY_DSN` | Your Sentry DSN URL |
| `STREAM_API_KEY` | Your GetStream API Key |
| `STREAM_API_SECRET` | Your GetStream API Secret |
| `IMAGEKIT_PUBLIC_KEY` | Your ImageKit Public Key |
| `IMAGEKIT_PRIVATE_KEY` | Your ImageKit Private Key |
| `IMAGEKIT_URL_ENDPOINT` | Your ImageKit URL Endpoint (e.g., `https://ik.imagekit.io/your_id`) |

#### Docker Build Arguments (Build-time)
Render allows you to pass build arguments to Docker. Add these in the **Environment** section as well:
| Key | Value Description |
|-----|-------------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Your production Clerk Publishable Key (`pk_live_...`) |

> [!IMPORTANT]
> Because the frontend is built during the Docker build process, `VITE_CLERK_PUBLISHABLE_KEY` **must** be available as a build argument.

---

## 3. Post-Deployment Steps

### 1. Database Migrations
Once the service is live, you need to push your schema to the production database. You can do this from your local machine by temporarily updating your `.env` with the production `DATABASE_URL` and running:
```bash
cd backend
npm run db:push
```

### 2. Configure Webhooks
Update your webhook URLs in Clerk and Polar (if used) to point to your new production domain:
- **Clerk Webhook**: `https://your-app-name.onrender.com/webhooks/clerk`
- **Polar Webhook**: `https://your-app-name.onrender.com/webhooks/polar`

### 3. Verify SSL
Render provides automatic managed SSL. Ensure your `DATABASE_URL` uses `sslmode=require` to connect securely.

---

## Troubleshooting
- **Frontend not loading**: Check if the `VITE_CLERK_PUBLISHABLE_KEY` build-arg was set correctly during the Render build.
- **API Errors**: Check the Render logs for backend crashes (likely due to missing environment variables or database connection issues).
- **CORS Issues**: The monolith setup serves frontend and backend from the same origin, so CORS should not be an issue.
