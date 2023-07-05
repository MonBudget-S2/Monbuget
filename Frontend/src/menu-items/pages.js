// assets
import { IconKey, IconMoneybag, IconBusinessplan, IconBrightness, IconSettings, IconOlympics,  IconReportMoney, IconCalendarEvent } from '@tabler/icons';

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
      icon: icons.IconMoneybag,

      // children: [
      //   {
      //     id: 'expense',
      //     title: "Vue d'ensemble",
      //     type: 'item',
      //     url: 'income'
      //   },
      //   // {
      //   //   id: 'listincomehistory',
      //   //   title: 'Historique des revenus',
      //   //   type: 'item',
      //   //   url: 'listincomehistory'
      //   // }
      // ]
    },
    {
      id: 'ManageExpense',
      title: 'Gestion des Dépenses',
      type: 'item',
      url: 'expense',
      icon: icons.IconBusinessplan,

      // children: [
      //   {
      //     id: 'expense',
      //     title: "Vue d'ensemble",
      //     type: 'item',
      //     url: 'expense'
      //     // target: false -> ouvre nouvel onglet
      //   },
      //   {
      //     id: 'addExpense',
      //     title: 'Ajouter une dépense',
      //     type: 'item',
      //     url: 'addexpense'
      //   },
      //   {
      //     id: 'listExpense',
      //     title: 'Liste des dépenses',
      //     type: 'item',
      //     url: 'listexpense'
      //   }
      // ]
    },
    {
      id: 'ManageCategoricalBudget',
      title: 'Gestion des Budgets catégoriels',
      type: 'item',
      url: 'categoricalbudget',
      icon: icons.IconBrightness,

      // children: [
      //   {
      //     id: 'categoricalBudget',
      //     title: "Vue d'ensemble",
      //     type: 'item',
      //     url: 'categoricalbudget'
      //     // target: false -> ouvre nouvel onglet
      //   },
      //   {
      //     id: 'budgetAllocation',
      //     title: 'Créer un budget catégoriel',
      //     type: 'item',
      //     url: 'budgetallocation'
      //   },
      //   {
      //     id: 'detailCategoricalBudgetModal',
      //     title: 'Budget catégoriel détaillé',
      //     type: 'item',
      //     url: 'detailcategoricalbudget'
      //   }
      // ]
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
          url: '/budgetEventPartagee',
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
      icon: icons.IconReportMoney,
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
      id: 'customerAdvisor',
      title: 'Contactez un conseiller',
      type: 'item',
      url: 'customerAdvisor',
      icon: icons.IconCalendarEvent,
      breadcrumbs: false
    }
  ]
};

export default pages;
