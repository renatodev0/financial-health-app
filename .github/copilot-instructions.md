<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Financial Health App - Copilot Instructions

## Project Overview
This is a React frontend application for personal financial control, built with:
- **Framework**: React 18 + Vite + TypeScript
- **UI Library**: Radix UI components with Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM
- **API Integration**: Axios for HTTP requests
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom design system

## API Integration
The app consumes a NestJS API running on `http://localhost:3000` with the following main endpoints:
- `/dashboard/monthly` - Monthly financial summary
- `/dashboard/yearly` - Yearly financial data
- `/dashboard/categories` - Category-based analysis
- `/credit-cards` - Credit card management
- `/fixed-expenses` - Fixed expenses management
- `/purchases` - Purchase tracking
- `/fixed-incomes` - Fixed income management
- `/incomes` - Income tracking
- `/investments` - Investment portfolio
- `/categories/expenses` - Expense categories
- `/categories/incomes` - Income categories

## Code Style and Patterns
- Use functional components with hooks
- Prefer TypeScript interfaces over types
- Use TanStack Query for all API calls
- Follow the established folder structure: `pages/`, `components/`, `services/`, `types/`, `lib/`
- Use Radix UI primitives for complex components
- Implement proper error handling and loading states
- Use the `cn()` utility for conditional CSS classes
- Follow React Query patterns for caching and data fetching

## Financial Business Rules
- All monetary values should be formatted in Brazilian Real (BRL)
- Support automatic recurring transactions (fixed incomes/expenses)
- Handle credit card bill generation and installment distribution
- Provide comprehensive dashboard with monthly/yearly views
- Support categorization for both income and expenses
- Include investment tracking and portfolio management

## Component Guidelines
- Create reusable UI components in `components/ui/`
- Use proper TypeScript types for all props
- Implement proper accessibility features
- Follow the established design system colors and spacing
- Use React Hook Form for complex forms with Zod validation
