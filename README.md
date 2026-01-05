# Multi-Step Claim Form (React + Vite)

A **multi-step insured claim form application** built using **React + Vite**.  
---

## 🚀 Tech Stack

- **React 18**
- **Vite**
- **Redux Toolkit** – global state management
- **TanStack Form** – advanced form handling & validation
- **TanStack Query** – async data handling & caching
- **Tailwind CSS** – UI styling
- **shadcn/ui** – reusable UI components

---

## ✨ Features

- 🔹 Multi-step form with section-based navigation
- 🔹 Centralized validation logic (no duplicate validation)
- 🔹 Browser-native validation disabled (`noValidate`)
- 🔹 Auto-filled and computed fields 
- 🔹 Expense group auto-calculation
- 🔹 Age auto-calculation from DOB
- 🔹 Redux-powered persistence across steps
- 🔹 Clean error handling and UX-friendly messages

---

## 🧠 Validation Strategy

- All validations are handled via a **single validation entry point**
- Validation is **type-based** (text, date, datetime, radio, checkbox-group, etc.)
- Prevents future date selection for date & datetime fields
- Avoids browser-native validation conflicts
- Auto-filled fields are excluded from validation

