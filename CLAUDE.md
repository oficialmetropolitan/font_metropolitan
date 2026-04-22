# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server on port 8080
npm run build      # Production build
npm run build:dev  # Development build
npm run lint       # ESLint
npm run preview    # Preview production build
```

There are no automated tests configured in this project.

## Architecture Overview

This is the frontend for **Banco Metropolitan**, a Brazilian credit/loan marketplace. It is a React + TypeScript SPA built with Vite, Tailwind CSS, and shadcn-ui components.

### Path Alias

`@/` resolves to `src/` (configured in `vite.config.ts`).

### Backend API

All HTTP calls go through the Axios instance at `src/services/http/axios.ts`, which points to `https://api.bancometropolitan.com.br`. The interceptor automatically clears `localStorage` and redirects to `/login` on any `401` response.

Authentication is token-based: after login, a JWT is stored in `localStorage` under the key `token`. Admin status is stored separately as `localStorage.getItem("is_admin") === "true"`.

### Route Guards

- `src/context/ProtectedRoute.tsx` — redirects to `/login` if no token in `localStorage`.
- `src/components/AdminRoute.tsx` — redirects to `/login` if no token or `is_admin !== "true"`.

### Global State

`src/context/ProfileContext.tsx` fetches the user profile once on app mount (if a token exists) and exposes `{ profile, setProfile, isLoading }` via `useProfileContext()`. The `isLoading` flag blocks rendering in `AppRoutes` until the initial profile fetch settles, preventing auth-flicker.

### Simulation Flow (`src/pages/simulate.tsx`)

The simulation wizard is a single-page state machine with three `etapa` states:

1. **`simulacao`** — user enters loan amount, term, purpose, and product-specific fields. On submit, calls `POST /api/simulacoes/calcular-imediato` to get installment values.
2. **`resultado`** — displays the calculated installment card with a Price Table amortization schedule (computed client-side in `gerarCronograma`).
3. **`lead`** — collects personal contact info (name, email, phone, birth date, city, state). On submit, calls `POST /api/simulacoes/salvar-lead` and then either:
   - Opens WhatsApp (`wa.me/5535997446658`) with a pre-filled summary message, or
   - Redirects to `/login` with pre-filled form state.

The `tipoEfetivo` computed value upgrades `emprestimo-pessoal` to `imovel-garantia` or `veiculo-garantia` based on the guarantee the user selects in `PessoalQuestions`.

Product-specific question components (`HomeEquityQuestions`, `CarEquityQuestions`, `ConsignadoQuestions`, etc.) are rendered by `renderSpecificQuestions(tipo, control)`.

### Product Catalog

`src/lib/produtoData.ts` — defines the `Product` interface and the `products` record keyed by slug (e.g., `'emprestimo-pessoal'`, `'capital-de-giro'`). Each product has `title`, `description`, `image`, `advantages`, `howItWorks`, and `faqs`. Product detail pages read this at `src/pages/ProdutoDetalhes.tsx` using the `:productId` route param.

`src/lib/loanOptions.ts` — defines `LOAN_CATEGORIES` and `LOAN_OPTIONS` (PF/PJ) with monthly interest rates used in calculations.

### Service Layer

There is intentional duplication between `src/services/api/profile.ts` and `src/services/api/simutation.ts` — both export `getProfile`/`createProfile`. The simulation file also exports `updateProfile`. Prefer importing from `src/services/api/simutation.ts` for simulation-adjacent pages and from `src/services/api/profile.ts` for profile-only pages.

Type definitions live in two files:
- `src/types/index.tsx` — `ProfilePayload`, `ProfileResponse`, `SimulationRequest`, `SimulationResponse`
- `src/types/loan.ts` — extended interfaces + `LOAN_TYPES`, `LOAN_PURPOSES`, and other lookup constants

### Admin Dashboard

`src/pages/AdminDashboard.tsx` at route `/admin/financeiro` (guarded by `AdminRoute`). It fetches all simulations from the API, supports filtering/search, allows status updates, and exports to XLSX via the `xlsx` + `file-saver` packages.
