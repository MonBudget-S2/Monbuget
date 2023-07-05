// assets
import {
  IconKey,
  IconMoneybag,
  IconBusinessplan,
  IconBrightness,
  IconSettings,
  IconOlympics,
  IconReportMoney,
  IconCalendarEvent
} from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconMoneybag,
  IconBusinessplan,
  IconBrightness,
  IconSettings,
  IconOlympics,
  IconReportMoney,
  IconCalendarEvent
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Gestion financière',
  type: 'group',
  children: [
    {
      id: 'ManageIncome',
      title: 'Gestion des Revenus',
      type: 'item',
      url: 'income',
      icon: icons.IconMoneybag
    },
    {
      id: 'ManageExpense',
      title: 'Gestion des Dépenses',
      type: 'item',
      url: 'expense',
      icon: icons.IconBusinessplan
    },
    {
      id: 'ManageCategoricalBudget',
      title: 'Gestion des Budgets catégoriels',
      type: 'item',
      url: 'categoricalbudget',
      icon: icons.IconBrightness
    },
    {
      id: 'ManageEvenementielBudget',
      title: 'Gestion des Budgets Événementiels',
      type: 'item',
      url: 'budgetEvenementiel',
      icon: icons.IconOlympics,
      children: [
        // {
        //   id: 'EvenementielBudget',
        //   title: "Vue d'ensemble",
        //   type: 'item',
        //   url: 'budgetEvenementiel'
        // },
        {
          id: 'AddEvenementielBudget',
          title: 'Ajouter une EventBudget',
          type: 'item',
          url: 'AddBudgetEvenementiel'
        },
        {
          id: 'AllEvenementielBudget',
          title: 'Mes EventBudgets',
          type: 'item',
          url: 'budgetEvenementielAll'
        },
        {
          id: 'BudgetEventPartagee',
          title: 'EventBudgets Partagée',
          type: 'item',
          url: '/budgetEventPartagee'
        },
        {
          id: 'AllEvenementielBudgetExpense',
          title: 'Liste des EventBudgets Dépenses',
          type: 'item',
          url: 'BudgetEventExpense'
        }
      ]
    },
    {
      id: 'ManageDebt',
      title: 'Gestion des Dettes',
      type: 'item',
      url: 'debt',
      icon: icons.IconReportMoney
      // children: [
      //   {
      //     id: 'Debt',
      //     title: "Vue d'ensemble",
      //     type: 'item',
      //     url: 'debt'
      //   }
      // ]
    },
    {
      id: 'settings',
      title: 'Paramètres',
      type: 'item',
      url: 'settings',
      icon: icons.IconSettings,
      breadcrumbs: false
    },
    {
      id: 'appointments',
      title: 'Mes Rendez-vous',
      type: 'item',
      url: 'clientCalendar',
      icon: icons.IconCalendarEvent,
      breadcrumbs: false
    }
  ]
};

export default pages;
