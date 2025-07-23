import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreditCards from './pages/CreditCards';
import FixedExpenses from './pages/FixedExpenses';
import FixedIncomes from './pages/FixedIncomes';
import Purchases from './pages/Purchases';
import Incomes from './pages/Incomes';
import Investments from './pages/Investments';
import Categories from './pages/Categories';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  useEffect(() => {
    document.title = 'Finance Health';
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="financial-health-theme">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/credit-cards" element={<CreditCards />} />
              <Route path="/fixed-expenses" element={<FixedExpenses />} />
              <Route path="/fixed-incomes" element={<FixedIncomes />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/incomes" element={<Incomes />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </Layout>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
