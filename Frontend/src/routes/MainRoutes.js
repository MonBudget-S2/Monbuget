import { lazy } from 'react';

// project imports
// import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoutes from './PrivateRoutes';
import Income from 'views/pages/income/Income';
// import AddIncome from 'views/pages/income/AddIncome';
import Expense from 'views/pages/expense/Expense';
import AddExpense from 'views/pages/expense/AddExpense';
import CategoricalBudget from 'views/pages/categoricalBudget/CategoricalBudget';
import BudgetAllocation from 'views/pages/categoricalBudget/AddCategoricalBudget';
import Settings from 'views/pages/notifications_settings/Settings';
import NewBudgetEvenementiel from 'views/dashboard/BudgetEvent/BudgetEventCreate';
import ListExpense from 'views/pages/expense/ListExpense';
import DetailCategoricalBudget from 'views/pages/categoricalBudget/DetailCategoricalBudget';
import ListIncomeHistory from 'views/pages/income/ListIncomeHistory';
import BudgetEvent from 'views/dashboard/BudgetEvent/BugetEvent';
import BudgetEventIndex from 'views/dashboard/BudgetEvent/BudgetEventIndex';
import BudgetEventExpense from '../views/dashboard/BudgetEvent/BudgetEventExpense';
import Debt from 'views/pages/debt/Debt';
import ListCategoricalBudget from 'views/pages/categoricalBudget/ListCategoricalBudget';
import Profil from 'views/pages/profil/Profil';
/*
import BudgetEventShow from 'views/dashboard/BudgetEvent/BudgetEventShow'
*/

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const BudgetEventShow = Loadable(lazy(() => import('views/dashboard/BudgetEvent/BudgetEventShow')));
// utilities routing
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
// const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: 'dashboard',
  element: (
    <PrivateRoutes />
    // <PrivateRoutes>
    // <MainLayout />
    // </PrivateRoutes>
  ),
  children: [
    {
      path: '',
      element: <DashboardDefault />
    },
    {
      path: 'income',
      element: <Income />
    },
    {
      path: 'listincomehistory',
      element: <ListIncomeHistory />
    },
    // {
    //   path: 'addincome',
    //   element: <AddIncome />
    // },
    {
      path: 'expense',
      element: <Expense />
    },
    {
      path: 'addexpense',
      element: <AddExpense />
    },
    {
      path: 'listexpense',
      element: <ListExpense />
    },
    {
      path: 'categoricalbudget',
      element: <CategoricalBudget />
    },
    {
      path: 'budgetallocation',
      element: <BudgetAllocation />
    },
    {
      path: 'AddBudgetEvenementiel',
      element: <NewBudgetEvenementiel />
    },
    {
      path: 'BudgetEventExpense',
      element: <BudgetEventExpense />
    },
    {
      path: 'budgetEvenementiel',
      element: <BudgetEvent />
    },
    {
      path: 'budgetEvent/:id',
      element: <BudgetEventShow />
    },
    {
      path: 'budgetEvenementielAll',
      element: <BudgetEventIndex />
    },
    {
      path: 'listcategoricalbudget',
      element: <ListCategoricalBudget />
    },
    {
      path: 'detailcategoricalbudget',
      element: <DetailCategoricalBudget />
    },
    {
      path: 'debt',
      element: <Debt />
    },
    {
      path: 'profil',
      element: <Profil />
    },
    {
      path: 'settings',
      element: <Settings />
    }

    // {
    //   path: 'dashboard',
    //   children: [
    //     {
    //       path: 'default',
    //       element: <DashboardDefault />
    //     }
    //   ]
    // }
  ]
};

export default MainRoutes;
