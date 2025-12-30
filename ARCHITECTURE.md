# Architecture Overview

This project is a **Product Analytics Dashboard** built with **Next.js App Router**, designed to demonstrate clean architecture, separation of concerns, and scalability within a frontend application.

The architecture intentionally mirrors real-world frontend systems where:

- External APIs act as infrastructure
- Domain logic lives outside UI components
- Pages orchestrate data but do not own business logic

---

## 🎯 Architectural Goals

- Clear separation between **UI**, **domain logic**, and **data access**
- Scalable, feature-based folder structure
- Strong typing with TypeScript
- Minimal logic inside React components
- Proper use of Next.js Server and Client Components

---

## 📁 Folder Structure Overview

```txt
src/
├─ app/                     # Next.js App Router (routing & layouts)
│  └─ [locale]/
│     ├─ dashboard/
│     └─ products/
│        ├─ page.tsx        # Product list (Server Component)
│        └─ [id]/
│           └─ page.tsx     # Product details (Server Component)
│
├─ features/
│  └─ product/              # Product feature (domain-based)
│     ├─ components/        # UI components (presentational)
│     ├─ hooks/             # Client-side state & query hooks
│     ├─ repository/        # Data access layer (API)
│     ├─ types/             # Domain & UI-related types
│     └─ product-service.ts # Application/domain service
```
