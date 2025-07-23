import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { dashboardService } from '../services';
import type { DashboardMonthly } from '../types';

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const { data: dashboardData, isLoading, error } = useQuery<DashboardMonthly>({
    queryKey: ['dashboard', 'monthly', year, month],
    queryFn: () => dashboardService.getMonthly(year, month),
  });

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Erro ao carregar dashboard
          </h2>
          <p className="text-gray-500">
            Não foi possível carregar os dados do dashboard.
          </p>
        </div>
      </div>
    );
  }

  const summary = dashboardData?.summary;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-lg font-semibold min-w-[200px] text-center text-gray-700 dark:text-gray-300">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">
              Total de Receitas
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {formatCurrency(summary?.totalIncome || 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">
              Total de Gastos
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">
              {formatCurrency(summary?.totalExpenses || 0)}
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">
              Faturas do Cartão
            </CardTitle>
            <CreditCard className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">
              {formatCurrency(summary?.totalCreditCardBills || 0)}
            </div>
          </CardContent>
        </Card>

        <Card className={`border-blue-200 ${(summary?.totalSaved || 0) >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium ${(summary?.totalSaved || 0) >= 0 ? 'text-green-800' : 'text-red-800'}`}>
              Saldo
            </CardTitle>
            <DollarSign className={`h-4 w-4 ${(summary?.totalSaved || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              (summary?.totalSaved || 0) >= 0 ? 'text-green-700' : 'text-red-700'
            }`}>
              {formatCurrency(summary?.totalSaved || 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Details */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Incomes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-700">Receitas Recentes</CardTitle>
            <CardDescription>
              Últimas receitas do mês atual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.details.incomes?.slice(0, 5).map((income) => (
                <div key={income.id} className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <div>
                    <p className="font-medium text-gray-900">{income.description}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(income.date), 'dd/MM/yyyy')}
                    </p>
                  </div>
                  <div className="text-green-600 font-semibold">
                    {formatCurrency(income.amount)}
                  </div>
                </div>
              ))}
              {(!dashboardData?.details.incomes || dashboardData.details.incomes.length === 0) && (
                <p className="text-gray-500 text-center py-4">
                  Nenhuma receita encontrada
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-700">Gastos Recentes</CardTitle>
            <CardDescription>
              Últimos gastos do mês atual
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.details.expenses?.slice(0, 5).map((expense) => (
                <div key={expense.id} className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <div>
                    <p className="font-medium text-gray-900">{expense.description}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(expense.date), 'dd/MM/yyyy')}
                    </p>
                  </div>
                  <div className="text-red-600 font-semibold">
                    {formatCurrency(expense.amount)}
                  </div>
                </div>
              ))}
              {(!dashboardData?.details.expenses || dashboardData.details.expenses.length === 0) && (
                <p className="text-gray-500 text-center py-4">
                  Nenhum gasto encontrado
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
