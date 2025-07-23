# Financial Health App

Uma aplicação React moderna para controle financeiro pessoal, construída com Vite, TypeScript, Radix UI e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** + **TypeScript** - Framework base com tipagem estática
- **Vite** - Build tool moderno e rápido
- **Radix UI** - Componentes acessíveis e customizáveis
- **Tailwind CSS** - Framework CSS utilitário
- **TanStack Query** - Gerenciamento de estado servidor
- **React Router DOM** - Roteamento
- **React Hook Form** + **Zod** - Formulários e validação
- **Axios** - Cliente HTTP
- **Date-fns** - Manipulação de datas
- **Chart.js** - Gráficos e visualizações
- **Lucide React** - Ícones

## 🎯 Funcionalidades

### Dashboard Financeiro
- ✅ Visão geral mensal de receitas e gastos
- ✅ Navegação entre meses
- ✅ Cards com resumo financeiro
- ✅ Listagem de transações recentes
- 🔄 Gráficos e análises (em desenvolvimento)

### Gestão Financeira
- 💳 **Cartões de Crédito** - Controle de faturas e limites
- 📝 **Gastos Fixos** - Despesas recorrentes mensais
- 🛒 **Compras** - Compras à vista e parceladas
- 💰 **Receitas** - Renda fixa e esporádica
- 📈 **Investimentos** - Portfolio de investimentos
- 🏷️ **Categorias** - Organização por categorias

### Características Técnicas
- 🎨 Design system moderno com Radix UI
- 📱 Interface responsiva
- ⚡ Performance otimizada com React Query
- 🔍 TypeScript para type safety
- 🎯 Componentes reutilizáveis

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes UI base (Radix + Tailwind)
│   └── Layout.tsx      # Layout principal
├── pages/              # Páginas da aplicação
│   └── Dashboard.tsx   # Dashboard principal
├── services/           # Serviços de API
│   ├── api.ts         # Configuração do Axios
│   └── index.ts       # Serviços específicos
├── types/              # Tipos TypeScript
│   └── index.ts       # Interfaces e tipos
├── lib/                # Utilitários
│   └── utils.ts       # Helpers (cn, etc.)
└── App.tsx            # Componente raiz
```

## 🔧 Configuração e Execução

### Pré-requisitos
- Node.js 20+
- NPM ou Yarn
- API Backend rodando em `http://localhost:3000`

### Instalação
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz:
```env
VITE_API_URL=http://localhost:3000
```

## 🔌 Integração com API

A aplicação consome uma API NestJS com os seguintes endpoints principais:

### Dashboard
- `GET /dashboard/monthly?year=2025&month=1` - Dados mensais
- `GET /dashboard/yearly?year=2025` - Dados anuais
- `GET /dashboard/categories` - Análise por categorias

### Gestão Financeira
- `GET/POST/PATCH/DELETE /credit-cards` - Cartões de crédito
- `GET/POST/PATCH/DELETE /fixed-expenses` - Gastos fixos
- `GET/POST/PATCH/DELETE /purchases` - Compras
- `GET/POST/PATCH/DELETE /fixed-incomes` - Renda fixa
- `GET/POST/PATCH/DELETE /incomes` - Receitas
- `GET/POST/PATCH/DELETE /investments` - Investimentos
- `GET/POST/PATCH/DELETE /categories/expenses` - Categorias de gastos
- `GET/POST/PATCH/DELETE /categories/incomes` - Categorias de renda

## 🎨 Sistema de Design

### Cores
A aplicação usa um sistema de cores baseado em CSS custom properties:
- `--primary` - Cor primária
- `--secondary` - Cor secundária  
- `--accent` - Cor de destaque
- `--muted` - Cor suave
- `--destructive` - Cor de erro
- `--border` - Cor de borda
- `--background` - Fundo
- `--foreground` - Texto

### Componentes UI
Baseados em Radix UI com estilização Tailwind:
- Button, Card, Input, Label
- Dialog, Toast, Tooltip
- Select, Tabs, Dropdown Menu

## 📈 Estado Atual

### ✅ Implementado
- Estrutura base React + Vite + TypeScript
- Sistema de design com Radix UI + Tailwind
- Configuração React Query para API calls
- Layout responsivo com sidebar
- Dashboard principal funcional
- Serviços para todas as APIs
- Tipos TypeScript completos

### 🔄 Em Desenvolvimento
- Páginas específicas (Cartões, Gastos, etc.)
- Formulários para CRUD operations
- Gráficos e visualizações
- Filtros e pesquisa
- Temas claro/escuro

### 📋 Roadmap
- Sistema de autenticação
- Exportação de relatórios
- Notificações push
- PWA (Progressive Web App)
- Testes automatizados

## 🤝 Desenvolvimento

### Scripts Disponíveis
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build
- `npm run lint` - Linting do código

### Padrões de Código
- Componentes funcionais com hooks
- TypeScript strict mode
- ESLint + Prettier para formatação
- Conventional commits
- React Query para state management

## 📱 Acesso

- **Frontend**: http://localhost:5173
- **API Backend**: http://localhost:3000
- **Documentação API**: http://localhost:3000/api

---

💰 **Financial Health App** - Controle financeiro inteligente e moderno
# financial-health-app
