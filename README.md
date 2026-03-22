# 🏡 Damara Household Cashflow

A personal household finance tracker built for **Bagas & Dean** to manage their monthly spending cycles, track budgets, and monitor reimbursements — all in one clean, mobile-friendly dashboard.

---

## ✨ Features

### 📊 Dashboard
- **Stats Overview** — At-a-glance cards showing Total Spent, Fixed Costs, and Expense Costs for the active cycle
- **Budget Limits** — Visual progress bars for each budget category, split into Personal (Bagas), Personal (Dean), and Shared/Household sections
- **Daily Cashflow** — Chronological transaction list with date grouping (same-date entries shown once) and category filters
- **Category Analytics** — Donut chart and top category breakdown for spending analysis

### ➕ Quick Entry Form
- Fast transaction entry with description, amount, wallet, category, and cost type
- **Date Picker** — Choose the date for each transaction with a "Set to Today" shortcut
- Formatted date display (e.g. "22 March 2026")
- Reimbursable checkbox for flagging transactions that need to be reimbursed

### 💸 Reimbursement Tracker
- **Reimbursable** section — Lists all pending reimbursable transactions with total
- **Transferred** section — Mark reimbursable transactions as transferred; they move here with visual distinction
- Running total for pending reimbursements

### 📱 Mobile Navigation
- Fixed bottom nav bar with smooth scroll to sections:
  - 🏠 **Home** → Back to top
  - 🌊 **Cashflow** → Daily Cashflow section
  - ➕ **+** → Quick Entry Form
  - 📊 **Stats** → Category Analytics section
  - 🧾 **Reimburse** → Reimbursement Tracker

### 🌙 Dark Mode
- Full dark mode support, toggled from the header

---

## 🗂️ Transaction Categories

| Category | Description |
|---|---|
| Belanja | General shopping |
| Bfast | Breakfast |
| Lunch | Lunch |
| Dinner | Dinner |
| Jajan | Snacks / drinks |
| Jajan Bagas | Bagas personal snacks |
| Jajan Dean | Dean personal snacks |
| Bensin | Fuel/petrol |
| Transport Bagas | Bagas commute costs |
| Transport Dean | Dean commute costs |
| Laundry | Laundry service |
| Cicilan | Installment payments |
| WIFI | Internet bill |
| Gift | Gifts |
| Household | Household items |
| Tagihan Rumah | Home utility bills |
| Self-care | Health & wellness |
| Travel | Travel expenses |

---

## 💳 Supported Wallets

BCA · Mandiri · Gopay · Cash · Jenius · ShopeePay · E-Money · DANA · OVO · Credit Card

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Database:** [Supabase](https://supabase.com) (PostgreSQL + Auth + Realtime)
- **Styling:** Tailwind CSS
- **Icons:** [Lucide React](https://lucide.dev)
- **Font:** Satoshi (via FontShare) + JetBrains Mono

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Supabase project with the required tables (`cycles`, `transactions`, `categories`, `budget_limits`)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/bagasstb/damara-household-cashflow.git
   cd damara-household-cashflow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages & layout
├── components/
│   ├── analytics/        # Category charts & analytics
│   ├── budget/           # Budget limit cards
│   ├── dashboard/        # Main dashboard components
│   └── layout/           # Header & mobile nav
├── lib/
│   ├── actions.ts        # Server actions (add transaction, mark transferred)
│   ├── services.ts       # Data fetching from Supabase
│   └── utils/            # Constants, formatters
└── types/                # TypeScript interfaces
```

---

## 👥 Made for

**Damara Household** — Bagas & Dean 🏠
