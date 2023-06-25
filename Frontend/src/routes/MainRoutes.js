import { lazy } from 'react';

// project imports
// import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoutes from './PrivateRoutes';
import Income from 'views/pages/income/Income';
import AddIncome from 'views/pages/income/AddIncome';
import Expense from 'views/pages/expense/Expense';
import AddExpense from 'views/pages/expense/AddExpense';
import CategoricalBudget from 'views/pages/categoricalBudget/CategoricalBudget';
import BudgetAllocation from 'views/pages/categoricalBudget/BudgetAllocation';
import Settings from 'views/pages/notifications_settings/Settings';
import NewBudgetEvenementiel from 'views/dashboard/BudgetEvent/BudgetEventCreate';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

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
  path: '/',
  element: (
    <PrivateRoutes />
    // <PrivateRoutes>
    // <MainLayout />
    // </PrivateRoutes>
  ),
  children: [
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: 'income',
      element: <Income />
    },
    {
      path: 'addincome',
      element: <AddIncome />
    },
    {
      path: 'expense',
      element: <Expense />
    },
    {
      path: 'addexpense',
      element: <AddExpense />
    },
    {
      path: 'categoricalbudget',
      element: <CategoricalBudget />
    },
    {
      path: 'Budgetallocation',
      element: <BudgetAllocation />
    },
    {
      path:'AddBudgetEvenementiel',
      element: <NewBudgetEvenementiel />
    },
    {
      path: 'Settings',
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
