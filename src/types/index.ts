export interface Category {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreditCard {
  id: string;
  name: string;
  closingDay: number;
  dueDay: number;
  limit: number;
  createdAt: string;
  updatedAt: string;
  bills?: CreditCardBill[];
}

export interface CreditCardBill {
  id: string;
  creditCardId: string;
  month: number;
  year: number;
  totalAmount: number;
  dueDate: string;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  creditCard?: CreditCard;
  expenses?: Expense[];
}

export interface FixedExpense {
  id: string;
  name: string;
  amount: number;
  dueDay: number;
  categoryId: string;
  creditCardId?: string;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  creditCard?: CreditCard;
  expenses?: Expense[];
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  creditCardBillId?: string;
  fixedExpenseId?: string;
  purchaseId?: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  creditCardBill?: CreditCardBill;
  fixedExpense?: FixedExpense;
  purchase?: Purchase;
}

export interface Purchase {
  id: string;
  description: string;
  totalAmount: number;
  installments: number;
  categoryId: string;
  creditCardId?: string;
  purchaseDate: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  creditCard?: CreditCard;
  installmentsList?: Installment[];
  expenses?: Expense[];
}

export interface Installment {
  id: string;
  purchaseId: string;
  installmentNumber: number;
  amount: number;
  dueDate: string;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  purchase?: Purchase;
}

export interface FixedIncome {
  id: string;
  name: string;
  amount: number;
  dayOfMonth: number;
  categoryId: string;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  incomes?: Income[];
}

export interface Income {
  id: string;
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  fixedIncomeId?: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  fixedIncome?: FixedIncome;
}

export interface Investment {
  id: string;
  name: string;
  type: string;
  initialAmount: number;
  currentAmount: number;
  investmentDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardMonthly {
  period: {
    year: number;
    month: number;
    monthName: string;
  };
  summary: {
    totalIncome: number;
    totalExpenses: number;
    totalCreditCardBills: number;
    totalInvestments: number;
    totalSpent: number;
    totalSaved: number;
  };
  details: {
    incomes: Income[];
    expenses: Expense[];
    creditCardBills: CreditCardBill[];
    investments: Investment[];
  };
}

export interface DashboardYearly {
  period: {
    year: number;
  };
  monthlyData: Array<{
    month: number;
    monthName: string;
    totalIncome: number;
    totalExpenses: number;
    totalSaved: number;
  }>;
  summary: {
    totalIncome: number;
    totalExpenses: number;
    totalSaved: number;
    averageMonthlyIncome: number;
    averageMonthlyExpenses: number;
  };
}

export interface DashboardCategories {
  expenses: Array<{
    categoryId: string;
    categoryName: string;
    total: number;
  }>;
  incomes: Array<{
    categoryId: string;
    categoryName: string;
    total: number;
  }>;
}

// DTOs for forms
export interface CreateCreditCardDto {
  name: string;
  closingDay: number;
  dueDay: number;
  limit: number;
}

export interface UpdateCreditCardDto {
  name?: string;
  closingDay?: number;
  dueDay?: number;
  limit?: number;
}

export interface CreatePurchaseDto {
  description: string;
  totalAmount: number;
  installments: number;
  categoryId: string;
  creditCardId?: string;
  purchaseDate: string;
}

export interface CreateIncomeDto {
  description: string;
  amount: number;
  date: string;
  categoryId: string;
}

export interface CreateFixedIncomeDto {
  name: string;
  amount: number;
  dayOfMonth: number;
  categoryId: string;
  startDate: string;
  endDate?: string;
}

export interface CreateFixedExpenseDto {
  name: string;
  amount: number;
  dueDay: number;
  categoryId: string;
  creditCardId?: string;
  startDate: string;
  endDate?: string;
}

export interface CreateInvestmentDto {
  name: string;
  type: string;
  initialAmount: number;
  currentAmount: number;
  investmentDate: string;
}

export interface CreateCategoryDto {
  name: string;
  color: string;
}
