# Weekly Draw Lottery — Client

This repository is the **web client** for a Weekly Draw Lottery platform. It is a single-page application where customers sign in with email OTP, purchase tickets through Chapa checkout, view tickets and wallet balance, and where administrators review platform metrics (users, tickets, revenue, payouts, winners, draws).

The app is built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, **React Router**, **Axios**, **Recharts**, and **Lucide React**. It talks to a separate **REST API** (not included here); local development assumes that API is available at the URL you configure (see [.env](#env-file-setup)).

---

## Features

### Customer

- Email OTP login
- Protected customer dashboard
- Buy lottery tickets (Chapa)
- Purchased tickets with pagination
- Wallet balance
- Payment success handling
- Logout

### Admin

- Same OTP login flow; route protection for admins
- Platform analytics dashboard
- Revenue / payout charts and totals for users, tickets, revenue, draws, winners, payouts
- Admin logout

---

## Tech stack

| Area        | Choices                                      |
|------------|-----------------------------------------------|
| UI         | React, TypeScript, Tailwind CSS, Lucide React |
| Build / dev | Vite                                       |
| Routing    | React Router DOM                             |
| HTTP       | Axios (Bearer token from `localStorage`)      |
| Charts     | Recharts                                     |

---

## Project layout

```
src/
  components/     ProtectedRoute, AdminRoute
  context/          AuthContext
  pages/            Login, VerifyOtp, Dashboard, AdminDashboard
  routes/           App routes
  services/         api (Axios client)
  lib/              Shared helpers (e.g. logout)
  App.tsx
  main.tsx
```

---

## Run on your machine

### Prerequisites

- **Node.js** 18 or newer (LTS recommended)
- **npm** (bundled with Node; or use your preferred compatible package manager)
- A running **lottery backend API** that matches what this client expects (default base URL: `http://localhost:8080/api`)

### Steps

1. **Clone or copy** this repo and open a terminal at the project root (`lottery-client`).

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment** (optional but recommended)

   Copy the example env file and adjust the API URL if your backend is not on the default host/port:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set `VITE_API_BASE_URL` as described in [.env file setup](#env-file-setup).

4. **Start the dev server**

   ```bash
   npm run dev
   ```

   Vite prints a local URL (typically `http://localhost:5173`). Open it in your browser. Ensure the backend is running and reachable at the configured base URL.

5. **Other scripts**

   | Command           | Purpose                          |
   |-------------------|----------------------------------|
   | `npm run dev`     | Development server with HMR      |
   | `npm run build`   | Typecheck + production build → `dist/` |
   | `npm run preview` | Serve the production build locally |
   | `npm run lint`    | ESLint                           |

Without a `.env` file, the client uses **`http://localhost:8080/api`** as the API base URL (see `src/services/api.ts`).

---

## `.env` file setup

This project uses **[Vite environment variables](https://vite.dev/guide/env-and-mode.html)**. Only names starting with **`VITE_`** are exposed to browser code.

### Creating `.env`

1. Copy `.env.example` to `.env` at the repo root:

   ```bash
   cp .env.example .env
   ```

2. Set **`VITE_API_BASE_URL`** to your backend’s public base URL — the path your Axios client should use for all `/...` routes. If your API is mounted under `/api`, include that segment (for example `http://localhost:8080/api`). No trailing slash is required unless your server dictates it.

   Example:

   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

### Behaviour and safety

- **Defaults:** If `VITE_API_BASE_URL` is unset, the app falls back to `http://localhost:8080/api`.
- **Restart dev server:** After changing `.env`, restart `npm run dev` so Vite picks up changes.
- **Production builds:** `VITE_*` values are embedded at **`npm run build`** time — use the correct URL for each deployment target.
- **Secrets:** Anything in `.env` with the `VITE_` prefix is included in client bundles — **do not** put private keys or server-only secrets there. This file is listed in `.gitignore`; keep secrets out of the repo.
- **Reference:** `.env.example` lists the variables this client supports; committed as documentation (no secrets).

---

## API client

Authenticated requests attach `Authorization: Bearer <token>` using the token stored in `localStorage` (see `src/services/api.ts`).
