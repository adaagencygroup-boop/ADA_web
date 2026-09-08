# ADA Group Admin Website — Project Analysis

## 1. What this is

`ada-group-admin-website` is the **internal admin/management portal** for ADA Group, built as a standalone Next.js app living inside a larger monorepo (`D:\ADA\ADA_web`) alongside the public-facing `ada-group-website` (`FE/`) and a Spring Boot backend (`BE/`, see §9). As of this writing, all page content is still **pure front-end UI backed by local mock/static data** (`_components/data.ts` files per route), all forms hold state in React only, and destructive/action buttons (delete, download, "Xem trước", etc.) are frequently non-functional placeholders — but the **data-fetching plumbing to the real backend now exists** (`axios` + TanStack Query, see §9.2), it just isn't wired into any page's rendering yet. Treat every page as UI-complete-but-not-yet-connected, not as intentionally backend-less.

## 2. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js **16.3.4** (App Router), React **19.2.8** |
| Language | TypeScript 5, strict mode |
| Styling | Tailwind CSS **v4** (CSS-first config via `app/globals.css`, no `tailwind.config.js`) |
| Component primitives | **shadcn/ui**, but generated on top of **`@base-ui/react`**, *not* Radix UI |
| Icons | `lucide-react` |
| Rich text | Tiptap (`@tiptap/react` + `starter-kit` + `extension-link`/`text-align`/`image`) |
| Date picking | `react-day-picker` v10 + `date-fns` (Vietnamese locale) |
| OTP input | `input-otp` |
| Fonts | Geist / Geist Mono via `next/font` |
| Data fetching | `axios` + `@tanstack/react-query` (installed & configured, not yet wired into any page — see §9.2) |
| Lint | ESLint 9 flat config (`eslint-config-next`) |

**Important non-obvious fact:** shadcn's CLI here (`components.json` → `"style": "base-nova"`) generates components using `@base-ui/react` primitives, not Radix. This means the usual Radix idioms don't apply:
- No `asChild` prop — base-ui uses a `render` prop (`useRender` pattern), e.g. `<SidebarMenuButton render={<Link href="..." />}>`.
- `Select.Value` does **not** auto-map value→label like Radix. When the display label differs from the raw value, you must pass `children` as a function: `<SelectValue>{(value) => label}</SelectValue>`.
- Boolean data-attributes render bare (`data-active`, no `="true"`), so Tailwind selectors must be `data-active:...`, not `data-[active=true]:...`.
- `Dialog`/`Sheet`/`Popover` all wrap `@base-ui/react/dialog` (or `popover`) under different names.

## 3. Routing structure (App Router)

Two route groups under `app/`, sharing a bare-bones root `app/layout.tsx` (html/body/fonts only):

### `(auth)` — unauthenticated flow, no sidebar/topbar chrome
```
/dang-nhap              Đăng nhập (login)
/quen-mat-khau          Quên mật khẩu (forgot password)
/dat-lai-mat-khau       Đặt lại mật khẩu (reset password)
/xac-nhan-thiet-bi      Xác nhận thiết bị (device trust notice)
/xac-thuc-email         Xác thực email
```

### `(dashboard)` — authenticated shell (`SidebarProvider` + `AppSidebar` + `Topbar`)
```
/                                  Dashboard home (placeholder)
/cai-dat                          Cài đặt hệ thống (backup settings)
/cai-dat/lich-su-sao-luu          Lịch sử sao lưu (backup history table)
/lien-he                          Liên hệ từ khách hàng (contacts master-detail)
/tai-khoan-admin                  Tài khoản admin (profile/security)
/tai-khoan-admin/lich-su-dang-nhap  Lịch sử đăng nhập (device sessions)
/tin-tuc                          Quản lý tin tức (news list)
/tin-tuc/danh-muc                 Danh mục tin tức (news category management)
/tin-tuc/tao-moi                  Thêm tin tức mới (create news, shared form)
/tin-tuc/[newsId]                 Xem bài viết (news detail view, reused as "Xem trước" preview)
/tin-tuc/[newsId]/sua             Sửa tin tức (edit news, shared form)
/tuyen-dung                       Dashboard tuyển dụng (recruitment dashboard)
/tuyen-dung/[jobId]                Xem bài tuyển dụng (job detail view)
/tuyen-dung/[jobId]/sua            Sửa thông tin tuyển dụng (edit job form)
/tuyen-dung/tao-moi                Thêm tin tuyển dụng mới (create job form)
```

**Convention:** every route segment is a Vietnamese slug (`dang-nhap`, `tuyen-dung`, `lien-he`, …); English is only used in code identifiers/component names.

## 4. Sidebar navigation (`src/components/app-sidebar.tsx`)

Six top-level items, each mapping 1:1 to a `(dashboard)` route: Dashboard, Quản lý tin tức, Tuyển dụng, Liên hệ, Tài khoản admin, Cài đặt. Active-state highlighting is `pathname`-based; `/` matches exactly, everything else via `startsWith`.

## 5. Component organization convention

- **`app/(group)/route/_components/`** — route-specific components, colocated and private to that route (Next.js `_` prefix excludes them from routing).
- **`app/(dashboard)/tuyen-dung/_components/job-form/`** and **`app/(dashboard)/tin-tuc/_components/news-form/`** — a shared sub-folder per module for its create/edit form, because the create and edit pages both need the same component (`JobForm.tsx` / `NewsForm.tsx`, each taking a `mode: "create" | "edit"` prop). This is the established pattern for any module that needs a create+edit pair — don't build two separate form components.
- **`src/components/shared/`** — cross-route reusable components: `PasswordField`, `OtpForm`, `RichTextEditor`. Promoted here once a second route needed them.
- **`src/components/ui/`** — shadcn-generated primitives, not hand-edited except for targeted fixes (e.g. `use-mobile.ts` lazy-init fix for an ESLint purity rule).

## 6. Key patterns worth remembering

1. **Mock data lives beside its route** as `_components/data.ts`, exporting typed arrays/generator functions (deterministic, no `Math.random()`, so output is stable across renders/SSR).
2. **List pages** (jobs, contacts, news, backups) all follow the same shape: local `useState` for search/filter/pageSize/page, a `useMemo` filter pipeline, client-side pagination math, and a `Select`-based page-size picker.
3. **Master-detail pages** (`/lien-he`) render inline as a two-column grid on `lg`+ screens and switch to a `Sheet` (slide-in panel) below `lg`, driven by a `matchMedia("(min-width: 1024px)")` hook.
4. **Popover-based pickers** are hand-built rather than native inputs: date range/single date via `Popover` + `Calendar` (react-day-picker), and a custom `WorkScheduleField` (day-of-week toggle chips + hour/minute `Select` pair) for anything resembling a schedule.
5. **Currency input** (`CurrencyInput.tsx`) formats with Vietnamese thousand-separator dots and a fixed "VND" suffix, storing only raw digits in state.
6. **RichTextEditor** (`src/components/shared/RichTextEditor.tsx`) wraps Tiptap with a hand-built toolbar (not a third-party template) supporting a `variant: "full" | "basic"` prop to hide align/link/image controls on fields that shouldn't have them. Notably, `Link.extend({ inclusive: false })` was required to stop the link mark from swallowing subsequently typed characters — Tiptap's `Link` mark ties `inclusive` to its `autolink` option by default.
7. **Page headers are standardized**: every dashboard page uses `<nav>` breadcrumb (`ChevronRight` separator, `text-sm text-[#434750]`, current crumb `font-medium text-[#1C1B1B]`) placed *above* an `<h1 className="text-3xl font-semibold text-[#1C1B1B]">`.
8. **Controlled `Select` gotcha (recurring bug source):** base-ui's `Select` throws a dev warning if a component switches between controlled/uncontrolled across its lifetime. Any filter `Select` whose "no selection" state was modeled as `undefined` and later became a string tripped this — the fix pattern used throughout is to always initialize with a defined sentinel value (e.g. `"all"`) rather than `undefined`, and use `SelectValue`'s children-function to render a friendly label for that sentinel.
9. **Auth was built once, then fully reverted** — a fairly complete `proxy.ts` (Next 16's renamed `middleware.ts`) + JWT/RBAC/session-cookie system was built and tested, then **reverted** on the instruction "chưa có backend nên hãy back lại code, đừng fallback" (no backend yet, so revert, don't build a fallback) — at the time, `BE/` either didn't exist yet or hadn't been confirmed. `BE/` now exists and has real JWT auth (see §9); auth pages are still pure UI and not reconnected, but the earlier rationale for staying disconnected no longer fully applies — confirm with the user before re-wiring rather than assuming the old revert still stands.
10. **Live-state preview via a modal, not a route**: `NewsForm`'s "Xem trước" doesn't navigate anywhere — it opens `ArticlePreviewDialog`, built from the form's current in-memory state (title/category/content/image/featured), reusing `RICH_TEXT_TYPOGRAPHY_CLASS` (exported from `RichTextEditor.tsx`) via `dangerouslySetInnerHTML` so the preview's typography matches both the editor and the real detail page exactly. Prefer this pattern over linking to a persisted-id detail page when the thing being previewed might not have an id yet (create mode).
11. **Standing verification workflow** after any change: `npx tsc --noEmit`, `npx eslint <path>`, `npx next typegen` (after adding/moving route files), and a `curl` 200-check against the already-running dev server.

## 7. Colors / design tokens actually in use

The app does **not** rely on the shadcn CSS-variable theme (`--primary`, `--foreground`, etc. in `app/globals.css`) for page content — those stay at their generic default values. Instead, nearly every page hardcodes Figma-sourced hex literals directly in Tailwind arbitrary values. The two color "families" seen across pages:
- Sidebar / brand navy family: `#001E4B` (dark navy), `#316EE9` (brand primary blue), `#434750` (secondary text).
- Content family: `#1C1B1B` (primary text/headings, now standardized for all page titles), `#6B7280`/`#9CA3AF` (muted text), `#D1D5DB`/`#C4C6D2`/`#E5E7EB` (borders), `#F9FAFB`/`#FCF9F8`/`#F8F9FB` (surface backgrounds).

`app/globals.css` also defines a global rule making all non-disabled buttons/links/`[role="button"]` show `cursor: pointer`.

## 8. Known gaps / things a future session should know before touching this repo

- No tests exist (no test runner configured).
- No real authentication — the `(auth)` flow is disconnected from the `(dashboard)` group; anyone can hit any dashboard URL directly. The backend has real JWT auth now (§9.1), so this is a "not yet wired" gap, not a "backend can't support it" gap.
- Every page still renders from local mock arrays in `_components/data.ts`, not from the backend, even though the HTTP client/query layer is in place (§9.2). No page has been migrated to `useQuery`/`useMutation` yet.
- `next.config.ts` allows two external image hosts: Supabase storage (real logo) and `images.unsplash.com` (placeholder hero/thumbnail images used in recruitment and news mock data).
- Git note: this admin app is a **subdirectory** of a single repo also containing `ada-group-website`; there is one `.git` at `D:\ADA\ADA_web`, so `git status`/`git diff` output is prefixed `FE/ada-group-admin-website/...`.

## 9. Backend & data layer

### 9.1 `BE/` (`D:\ADA\ADA_web\BE`)

A separate Spring Boot (Java) backend, in the same monorepo root but its own Maven project (`pom.xml`), covering auth, admin news/recruitment/contact/settings/dashboard/notification modules, and public read-only counterparts — see `BE/ReadMe.md` for the full 74-endpoint reference, and `BE/API_FORMAT.md` (written this session) for the envelope/convention documentation: every JSON response is `{ success, message, data, timestamp }`, paginated lists are `{ items, pagination }` with **1-indexed `page`**, errors reuse the same envelope with `success: false`, auth is `Authorization: Bearer <jwt>`, and Excel/backup-file/SSE endpoints return raw bytes/streams outside that envelope entirely.

### 9.2 FE data-fetching setup (installed, not yet used by any page)

- `src/lib/api/client.ts` — a shared `axios` instance (`apiClient`) pointed at `NEXT_PUBLIC_API_BASE_URL` (`.env.local`, currently `http://localhost:8080/api/v1`), with a request interceptor attaching the bearer token from `localStorage["accessToken"]`, a response interceptor normalizing failures to `new Error(message)`, and an `unwrap<T>()` helper for pulling `response.data.data` out of the backend's envelope.
- `src/lib/api/types.ts` — `APIResponse<T>` and `PageResponse<T>` typed to mirror `BE/`'s Java records exactly.
- `src/providers/QueryProvider.tsx` — a `"use client"` wrapper around `QueryClientProvider` (default `staleTime: 60s`, `retry: 1`, `refetchOnWindowFocus: false`, devtools only in development), mounted in `app/layout.tsx` around `{children}`.
- No query/mutation hooks exist yet for any specific endpoint — the next step for any page migration is to write a `use<Thing>Query`/`use<Thing>Mutation` next to that route (or in its `_components/`) calling `apiClient` + `unwrap`, not to fetch inline in a component.
