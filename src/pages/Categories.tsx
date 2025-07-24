import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Tags, TrendingUp, TrendingDown } from 'lucide-react';
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
import { categoriesService } from '../services';
import type { Category, CreateCategoryDto } from '../types';

const PRESET_COLORS = [
  '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16',
  '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9',
  '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF',
  '#EC4899', '#F43F5E', '#6B7280', '#374151', '#1F2937'
];

export default function Categories() {
  const [activeTab, setActiveTab] = useState<'expenses' | 'incomes'>('expenses');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState<CreateCategoryDto>({
    name: '',
    color: '#3B82F6',
  });

  const queryClient = useQueryClient();

  const { data: expenseCategories = [], isLoading: loadingExpenses } = useQuery<Category[]>({
    queryKey: ['categories', 'expenses'],
    queryFn: categoriesService.getExpenseCategories,
  });

  const { data: incomeCategories = [], isLoading: loadingIncomes } = useQuery<Category[]>({
    queryKey: ['categories', 'incomes'],
    queryFn: categoriesService.getIncomeCategories,
  });

  const createExpenseMutation = useMutation({
    mutationFn: categoriesService.createExpenseCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', 'expenses'] });
      setIsCreateDialogOpen(false);
      setFormData({ name: '', color: '#3B82F6' });
    },
  });

  const createIncomeMutation = useMutation({
    mutationFn: categoriesService.createIncomeCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories', 'incomes'] });
      setIsCreateDialogOpen(false);
      setFormData({ name: '', color: '#3B82F6' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'expenses') {
      createExpenseMutation.mutate(formData);
    } else {
      createIncomeMutation.mutate(formData);
    }
  };

  const handleInputChange = (field: keyof CreateCategoryDto, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isLoading = loadingExpenses || loadingIncomes;
  const currentCategories = activeTab === 'expenses' ? expenseCategories : incomeCategories;
  const currentMutation = activeTab === 'expenses' ? createExpenseMutation : createIncomeMutation;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categorias</h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Categorias</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Categoria
            </Button>
          </DialogTrigger>
          <DialogContent className="mx-4 w-[calc(100vw-2rem)] max-w-md sm:mx-auto sm:w-full">
            <DialogHeader>
              <DialogTitle>
                Nova Categoria de {activeTab === 'expenses' ? 'Despesa' : 'Receita'}
              </DialogTitle>
              <DialogDescription>
                Adicione uma nova categoria para organizar suas {activeTab === 'expenses' ? 'despesas' : 'receitas'}.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Categoria</Label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-3 text-base sm:py-2 sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Ex: Alimentação, Salário, Transporte"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color">Cor da Categoria</Label>
                <div className="grid grid-cols-10 gap-2 mb-2">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleInputChange('color', color)}
                      className={`w-8 h-8 rounded-md border-2 ${
                        formData.color === color 
                          ? 'border-gray-900 dark:border-white scale-110' 
                          : 'border-gray-300 dark:border-gray-600'
                      } transition-all`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <input
                  id="color"
                  type="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  className="w-full h-10 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={currentMutation.isPending}
                  className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 w-full sm:w-auto"
                >
                  {currentMutation.isPending ? 'Criando...' : 'Criar Categoria'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('expenses')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'expenses'
                ? 'border-red-500 text-red-600 dark:text-red-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <TrendingDown className="inline h-4 w-4 mr-1" />
            Categorias de Despesa ({expenseCategories.length})
          </button>
          <button
            onClick={() => setActiveTab('incomes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'incomes'
                ? 'border-green-500 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <TrendingUp className="inline h-4 w-4 mr-1" />
            Categorias de Receita ({incomeCategories.length})
          </button>
        </nav>
      </div>

      {/* Categories Grid */}
      {currentCategories.length === 0 ? (
        <div className="text-center py-12">
          <Tags className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhuma categoria de {activeTab === 'expenses' ? 'despesa' : 'receita'} cadastrada
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Crie categorias para organizar suas {activeTab === 'expenses' ? 'despesas' : 'receitas'}.
          </p>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Categoria
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {currentCategories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Categoria de {activeTab === 'expenses' ? 'Despesa' : 'Receita'}
                  </div>
                  {activeTab === 'expenses' ? (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
