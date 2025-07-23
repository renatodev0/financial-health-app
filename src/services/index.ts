import { api } from './api';
import type {
  DashboardMonthly,
  DashboardYearly,
  DashboardCategories,
  CreditCard,
  CreateCreditCardDto,
  UpdateCreditCardDto,
  FixedExpense,
  CreateFixedExpenseDto,
  Purchase,
  CreatePurchaseDto,
  FixedIncome,
  CreateFixedIncomeDto,
  Income,
  CreateIncomeDto,
  Investment,
  CreateInvestmentDto,
  Category,
  CreateCategoryDto,
} from '../types';

// Dashboard Services
export const dashboardService = {
  getMonthly: async (year: number, month: number): Promise<DashboardMonthly> => {
    const response = await api.get(`/dashboard/monthly?year=${year}&month=${month}`);
    return response.data;
  },

  getYearly: async (year: number): Promise<DashboardYearly> => {
    const response = await api.get(`/dashboard/yearly?year=${year}`);
    return response.data;
  },

  getCategories: async (): Promise<DashboardCategories> => {
    const response = await api.get('/dashboard/categories');
    return response.data;
  },
};

// Credit Cards Services
export const creditCardsService = {
  getAll: async (): Promise<CreditCard[]> => {
    const response = await api.get('/credit-cards');
    return response.data;
  },

  getById: async (id: string): Promise<CreditCard> => {
    const response = await api.get(`/credit-cards/${id}`);
    return response.data;
  },

  create: async (data: CreateCreditCardDto): Promise<CreditCard> => {
    const response = await api.post('/credit-cards', data);
    return response.data;
  },

  update: async (id: string, data: UpdateCreditCardDto): Promise<CreditCard> => {
    const response = await api.patch(`/credit-cards/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/credit-cards/${id}`);
  },
};

// Fixed Expenses Services
export const fixedExpensesService = {
  getAll: async (): Promise<FixedExpense[]> => {
    const response = await api.get('/fixed-expenses');
    return response.data;
  },

  getById: async (id: string): Promise<FixedExpense> => {
    const response = await api.get(`/fixed-expenses/${id}`);
    return response.data;
  },

  create: async (data: CreateFixedExpenseDto): Promise<FixedExpense> => {
    const response = await api.post('/fixed-expenses', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateFixedExpenseDto>): Promise<FixedExpense> => {
    const response = await api.patch(`/fixed-expenses/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/fixed-expenses/${id}`);
  },
};

// Purchases Services
export const purchasesService = {
  getAll: async (): Promise<Purchase[]> => {
    const response = await api.get('/purchases');
    return response.data;
  },

  getById: async (id: string): Promise<Purchase> => {
    const response = await api.get(`/purchases/${id}`);
    return response.data;
  },

  create: async (data: CreatePurchaseDto): Promise<Purchase> => {
    const response = await api.post('/purchases', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreatePurchaseDto>): Promise<Purchase> => {
    const response = await api.patch(`/purchases/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/purchases/${id}`);
  },
};

// Fixed Incomes Services
export const fixedIncomesService = {
  getAll: async (): Promise<FixedIncome[]> => {
    const response = await api.get('/fixed-incomes');
    return response.data;
  },

  getById: async (id: string): Promise<FixedIncome> => {
    const response = await api.get(`/fixed-incomes/${id}`);
    return response.data;
  },

  create: async (data: CreateFixedIncomeDto): Promise<FixedIncome> => {
    const response = await api.post('/fixed-incomes', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateFixedIncomeDto>): Promise<FixedIncome> => {
    const response = await api.patch(`/fixed-incomes/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/fixed-incomes/${id}`);
  },
};

// Incomes Services
export const incomesService = {
  getAll: async (): Promise<Income[]> => {
    const response = await api.get('/incomes');
    return response.data;
  },

  getById: async (id: string): Promise<Income> => {
    const response = await api.get(`/incomes/${id}`);
    return response.data;
  },

  create: async (data: CreateIncomeDto): Promise<Income> => {
    const response = await api.post('/incomes', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateIncomeDto>): Promise<Income> => {
    const response = await api.patch(`/incomes/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/incomes/${id}`);
  },
};

// Investments Services
export const investmentsService = {
  getAll: async (): Promise<Investment[]> => {
    const response = await api.get('/investments');
    return response.data;
  },

  getById: async (id: string): Promise<Investment> => {
    const response = await api.get(`/investments/${id}`);
    return response.data;
  },

  create: async (data: CreateInvestmentDto): Promise<Investment> => {
    const response = await api.post('/investments', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateInvestmentDto>): Promise<Investment> => {
    const response = await api.patch(`/investments/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/investments/${id}`);
  },
};

// Categories Services
export const categoriesService = {
  getExpenseCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories/expenses');
    return response.data;
  },

  getIncomeCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories/incomes');
    return response.data;
  },

  createExpenseCategory: async (data: CreateCategoryDto): Promise<Category> => {
    const response = await api.post('/categories/expenses', data);
    return response.data;
  },

  createIncomeCategory: async (data: CreateCategoryDto): Promise<Category> => {
    const response = await api.post('/categories/incomes', data);
    return response.data;
  },

  updateExpenseCategory: async (id: string, data: Partial<CreateCategoryDto>): Promise<Category> => {
    const response = await api.patch(`/categories/expenses/${id}`, data);
    return response.data;
  },

  updateIncomeCategory: async (id: string, data: Partial<CreateCategoryDto>): Promise<Category> => {
    const response = await api.patch(`/categories/incomes/${id}`, data);
    return response.data;
  },

  deleteExpenseCategory: async (id: string): Promise<void> => {
    await api.delete(`/categories/expenses/${id}`);
  },

  deleteIncomeCategory: async (id: string): Promise<void> => {
    await api.delete(`/categories/incomes/${id}`);
  },
};
