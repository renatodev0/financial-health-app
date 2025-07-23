import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { fixedIncomesService, categoriesService } from '../services';
import type { FixedIncome, CreateFixedIncomeDto, Category } from '../types';

export default function FixedIncomes() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState<CreateFixedIncomeDto>({
    name: '',
    amount: 0,
    dayOfMonth: 1,
    categoryId: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: undefined,
  });

  const queryClient = useQueryClient();

  const { data: fixedIncomes = [], isLoading } = useQuery<FixedIncome[]>({
    queryKey: ['fixedIncomes'],
    queryFn: fixedIncomesService.getAll,
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories', 'incomes'],
    queryFn: categoriesService.getIncomeCategories,
  });

  const createMutation = useMutation({
    mutationFn: fixedIncomesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fixedIncomes'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      setIsCreateDialogOpen(false);
      setFormData({
        name: '',
        amount: 0,
        dayOfMonth: 1,
        categoryId: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: undefined,
      });
    },
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) {
      return; // Categoria é obrigatória
    }
    createMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof CreateFixedIncomeDto, value: string | number | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Receitas Fixas</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Receitas Fixas</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Receita Fixa
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Receita Fixa</DialogTitle>
              <DialogDescription>
                Adicione uma nova receita fixa mensal.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Receita</Label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: Salário"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Valor</Label>
                  <input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0,00"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dayOfMonth">Dia do Recebimento</Label>
                  <input
                    id="dayOfMonth"
                    type="number"
                    min="1"
                    max="31"
                    value={formData.dayOfMonth}
                    onChange={(e) => handleInputChange('dayOfMonth', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="categoryId">Categoria</Label>
                <select
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={(e) => handleInputChange('categoryId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {createMutation.isPending ? 'Criando...' : 'Criar Receita'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Incomes Grid */}
      {fixedIncomes.length === 0 ? (
        <div className="text-center py-12">
          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma receita fixa cadastrada
          </h3>
          <p className="text-gray-500 mb-4">
            Adicione suas receitas fixas mensais como salário, rendas, etc.
          </p>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Receita Fixa
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fixedIncomes.map((income) => (
            <Card key={income.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  {income.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Valor
                  </div>
                  <span className="font-medium text-green-600">
                    {formatCurrency(income.amount)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    Recebimento
                  </div>
                  <span className="font-medium">Dia {income.dayOfMonth}</span>
                </div>
                
                {income.category && (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">Categoria</div>
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: income.category.color || '#6B7280' }}
                    >
                      {income.category.name}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
