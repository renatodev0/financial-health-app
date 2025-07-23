import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import {
  LayoutDashboard,
  CreditCard,
  Receipt,
  ShoppingCart,
  TrendingUp,
  PiggyBank,
  Tags,
  DollarSign,
  LogOut,
  User,
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Cartões de Crédito',
    href: '/credit-cards',
    icon: CreditCard,
  },
  {
    name: 'Gastos Fixos',
    href: '/fixed-expenses',
    icon: Receipt,
  },
  {
    name: 'Receitas Fixas',
    href: '/fixed-incomes',
    icon: DollarSign,
  },
  {
    name: 'Compras',
    href: '/purchases',
    icon: ShoppingCart,
  },
  {
    name: 'Renda',
    href: '/incomes',
    icon: TrendingUp,
  },
  {
    name: 'Investimentos',
    href: '/investments',
    icon: PiggyBank,
  },
  {
    name: 'Categorias',
    href: '/categories',
    icon: Tags,
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <PiggyBank className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Finance Health
              </span>
            </div>
            <ThemeToggle />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Info & Settings */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            {/* User Info */}
            <div className="flex items-center px-3 py-2 text-sm">
              <User className="h-4 w-4 mr-3 text-gray-500 dark:text-gray-400" />
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 dark:text-white font-medium truncate">
                  {user?.name}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            
            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sair
            </Button>
            
            {/* Version */}
            <div className="flex items-center px-3 py-1 text-xs text-gray-500 dark:text-gray-400">
              <Tags className="h-3 w-3 mr-2" />
              v1.0.0
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
