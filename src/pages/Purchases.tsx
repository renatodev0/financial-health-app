import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, ShoppingCart, Calendar, DollarSign, CreditCard as CreditCardIcon } from 'lucide-react';
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
import { purchasesService, categoriesService, creditCardsService } from '../services';
import type { Purchase, CreatePurchaseDto, Category, CreditCard } from '../types';

export default function Purchases() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState<CreatePurchaseDto>({
    description: '',
    totalAmount: 0,
    installments: 1,
    purchaseDate: new Date().toISOString().split('T')[0],
    creditCardId: undefined,
    categoryId: '',
  });

  const queryClient = useQueryClient();

  const { data: purchases = [], isLoading } = useQuery<Purchase[]>({
    queryKey: ['purchases'],
    queryFn: purchasesService.getAll,
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories', 'expenses'],
    queryFn: categoriesService.getExpenseCategories,
  });

  const { data: creditCards = [] } = useQuery<CreditCard[]>({
    queryKey: ['creditCards'],
    queryFn: creditCardsService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: purchasesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      setIsCreateDialogOpen(false);
      setFormData({
        description: '',
        totalAmount: 0,
        installments: 1,
        purchaseDate: new Date().toISOString().split('T')[0],
        creditCardId: undefined,
        categoryId: '',
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

  const handleInputChange = (field: keyof CreatePurchaseDto, value: string | number | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Compras Parceladas</h1>
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
        <h1 className="text-3xl font-bold text-gray-900">Compras Parceladas</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Compra
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Compra Parcelada</DialogTitle>
              <DialogDescription>
                Adicione uma nova compra parcelada.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Nome da Compra</Label>
                <input
                  id="description"
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ex: Notebook"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalAmount">Valor Total</Label>
                  <input
                    id="totalAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.totalAmount}
                    onChange={(e) => handleInputChange('totalAmount', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0,00"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="installments">Parcelas</Label>
                  <input
                    id="installments"
                    type="number"
                    min="1"
                    max="99"
                    value={formData.installments}
                    onChange={(e) => handleInputChange('installments', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">Data da Compra</Label>
                <input
                  id="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="categoryId">Categoria</Label>
                <select
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={(e) => handleInputChange('categoryId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              
              <div className="space-y-2">
                <Label htmlFor="creditCardId">Cartão de Crédito (Opcional)</Label>
                <select
                  id="creditCardId"
                  value={formData.creditCardId || ''}
                  onChange={(e) => handleInputChange('creditCardId', e.target.value || undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Débito/Dinheiro</option>
                  {creditCards.map((card) => (
                    <option key={card.id} value={card.id}>
                      {card.name}
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
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {createMutation.isPending ? 'Criando...' : 'Criar Compra'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Purchases Grid */}
      {purchases.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma compra parcelada cadastrada
          </h3>
          <p className="text-gray-500 mb-4">
            Adicione suas compras parceladas para controlar as parcelas.
          </p>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Compra
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {purchases.map((purchase) => (
            <Card key={purchase.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg">
                  <ShoppingCart className="h-5 w-5 mr-2 text-purple-600" />
                  {purchase.description}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Valor Total
                  </div>
                  <span className="font-medium text-purple-600">
                    {formatCurrency(purchase.totalAmount)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Parcelas</div>
                  <span className="font-medium">
                    {purchase.installments}x de {formatCurrency(purchase.totalAmount / purchase.installments)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    Data da Compra
                  </div>
                  <span className="font-medium">
                    {new Date(purchase.purchaseDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                {purchase.creditCard && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <CreditCardIcon className="h-4 w-4 mr-1" />
                      Cartão
                    </div>
                    <span className="font-medium text-blue-600">
                      {purchase.creditCard.name}
                    </span>
                  </div>
                )}
                
                {purchase.category && (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">Categoria</div>
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: purchase.category.color || '#6B7280' }}
                    >
                      {purchase.category.name}
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
