import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, PiggyBank, Calendar, DollarSign, TrendingUp } from 'lucide-react';
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
import { investmentsService } from '../services';
import type { Investment, CreateInvestmentDto } from '../types';

const INVESTMENT_TYPES = [
  { value: 'TESOURO_DIRETO', label: 'Tesouro Direto' },
  { value: 'CDB', label: 'CDB' },
  { value: 'LCI_LCA', label: 'LCI/LCA' },
  { value: 'FUNDO_INVESTIMENTO', label: 'Fundo de Investimento' },
  { value: 'ACAO', label: 'Ação' },
  { value: 'CRIPTO', label: 'Criptomoeda' },
  { value: 'POUPANCA', label: 'Poupança' },
  { value: 'OUTROS', label: 'Outros' },
];

export default function Investments() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState<CreateInvestmentDto>({
    name: '',
    type: '',
    initialAmount: 0,
    currentAmount: 0,
    investmentDate: new Date().toISOString().split('T')[0],
  });

  const queryClient = useQueryClient();

  const { data: investments = [], isLoading } = useQuery<Investment[]>({
    queryKey: ['investments'],
    queryFn: investmentsService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: investmentsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      setIsCreateDialogOpen(false);
      setFormData({
        name: '',
        type: '',
        initialAmount: 0,
        currentAmount: 0,
        investmentDate: new Date().toISOString().split('T')[0],
      });
    },
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const calculateReturn = (initial: number, current: number) => {
    if (initial === 0) return 0;
    return ((current - initial) / initial) * 100;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type) {
      return; // Tipo é obrigatório
    }
    createMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof CreateInvestmentDto, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Investimentos</h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const totalInvested = investments.reduce((sum, inv) => sum + inv.initialAmount, 0);
  const totalCurrent = investments.reduce((sum, inv) => sum + inv.currentAmount, 0);
  const totalReturn = calculateReturn(totalInvested, totalCurrent);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Investimentos</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Investimento
            </Button>
          </DialogTrigger>
          <DialogContent className="mx-4 w-[calc(100vw-2rem)] max-w-md sm:mx-auto sm:w-full">
            <DialogHeader>
              <DialogTitle>Novo Investimento</DialogTitle>
              <DialogDescription>
                Adicione um novo investimento ao seu portfólio.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Investimento</Label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Ex: Tesouro SELIC 2030"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Investimento</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Selecione o tipo</option>
                  {INVESTMENT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="initialAmount">Valor Investido</Label>
                  <input
                    id="initialAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.initialAmount}
                    onChange={(e) => handleInputChange('initialAmount', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="0,00"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currentAmount">Valor Atual</Label>
                  <input
                    id="currentAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.currentAmount}
                    onChange={(e) => handleInputChange('currentAmount', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="0,00"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="investmentDate">Data do Investimento</Label>
                <input
                  id="investmentDate"
                  type="date"
                  value={formData.investmentDate}
                  onChange={(e) => handleInputChange('investmentDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
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
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  {createMutation.isPending ? 'Criando...' : 'Criar Investimento'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      {investments.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Total Investido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {formatCurrency(totalInvested)}
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">
                Valor Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {formatCurrency(totalCurrent)}
              </div>
            </CardContent>
          </Card>

          <Card className={`border-${totalReturn >= 0 ? 'green' : 'red'}-200 bg-${totalReturn >= 0 ? 'green' : 'red'}-50 dark:bg-${totalReturn >= 0 ? 'green' : 'red'}-900/20 dark:border-${totalReturn >= 0 ? 'green' : 'red'}-800`}>
            <CardHeader className="pb-2">
              <CardTitle className={`text-sm font-medium text-${totalReturn >= 0 ? 'green' : 'red'}-800 dark:text-${totalReturn >= 0 ? 'green' : 'red'}-200`}>
                Rentabilidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold text-${totalReturn >= 0 ? 'green' : 'red'}-700 dark:text-${totalReturn >= 0 ? 'green' : 'red'}-300`}>
                {totalReturn >= 0 ? '+' : ''}{totalReturn.toFixed(2)}%
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Investments Grid */}
      {investments.length === 0 ? (
        <div className="text-center py-12">
          <PiggyBank className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhum investimento cadastrado
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Adicione seus investimentos para acompanhar o crescimento do seu patrimônio.
          </p>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Investimento
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {investments.map((investment) => {
            const returnPercent = calculateReturn(investment.initialAmount, investment.currentAmount);
            const returnValue = investment.currentAmount - investment.initialAmount;
            
            return (
              <Card key={investment.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg">
                    <PiggyBank className="h-5 w-5 mr-2 text-blue-600" />
                    {investment.name}
                  </CardTitle>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {INVESTMENT_TYPES.find(t => t.value === investment.type)?.label || investment.type}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Investido
                    </div>
                    <span className="font-medium">
                      {formatCurrency(investment.initialAmount)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Valor Atual
                    </div>
                    <span className="font-medium text-blue-600">
                      {formatCurrency(investment.currentAmount)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Rentabilidade</div>
                    <div className="text-right">
                      <div className={`font-medium ${returnPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {returnPercent >= 0 ? '+' : ''}{returnPercent.toFixed(2)}%
                      </div>
                      <div className={`text-xs ${returnPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {returnPercent >= 0 ? '+' : ''}{formatCurrency(returnValue)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      Data
                    </div>
                    <span className="font-medium">
                      {new Date(investment.investmentDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
