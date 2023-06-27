// assets
import {
  IconKey,
  IconMoneybag,
  IconBusinessplan,
  IconBrightness,
  IconSettings,
  IconOlympics
} from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconMoneybag,
  IconBusinessplan,
  IconBrightness,
  IconSettings,
  IconOlympics
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Gestion financière',
  type: 'group',
  children: [
    {
      id: 'ManageIncome',
      title: 'Gestion des revenus',
      type: 'collapse',
      url: '/income',
      icon: icons.IconMoneybag,

      children: [
        {
          id: 'expense',
          title: "Vue d'ensemble",
          type: 'item',
          url: '/income'
        },
        {
          id: 'listincomehistory',
          title: "Historique des revenus",
          type: 'item',
          url: '/listincomehistory'
        },
      ]
    },
    {
      id: 'ManageExpense',
      title: 'Gestion des Dépenses',
      type: 'collapse',
      icon: icons.IconBusinessplan,

      children: [
        {
          id: 'expense',
          title: "Vue d'ensemble",
          type: 'item',
          url: '/expense'
          // target: false -> ouvre nouvel onglet
        },
        {
          id: 'addExpense',
          title: 'Ajouter une dépense',
          type: 'item',
          url: '/addexpense',
        },
        {
          id: 'listExpense',
          title: 'Liste des dépenses',
          type: 'item',
          url: '/listexpense',
        },
      ]
    },
    {
      id: 'ManageCategoricalBudget',
      title: 'Gestion des Budgets catégoriels',
      type: 'collapse',
      icon: icons.IconBrightness,

      children: [
        {
          id: 'categoricalBudget',
          title: "Vue d'ensemble",
          type: 'item',
          url: '/categoricalbudget'
          // target: false -> ouvre nouvel onglet
        },
        {
          id: 'budgetAllocation',
          title: 'Créer un budget catégoriel',
          type: 'item',
          url: '/budgetallocation',
        },
        {
          id: 'detailCategoricalBudgetModal',
          title: 'Budget catégoriel détaillé',
          type: 'item',
          url: '/detailcategoricalbudget',
        },
      ]
    },
    {
      id: 'ManageEvenementielBudget',
      title: 'Gestion des Budgets Event',
      type: 'collapse',
      icon: icons.IconOlympics,
      children: [
        {
          id: 'EvenementielBudget',
          title: 'Vue d\'ensemble',
          type: 'item',
          url: '/budgetEvenementiel'
        },
        {
          id: 'AddEvenementielBudget',
          title: 'Ajouter une EventBudget',
          type: 'item',
          url: '/AddBudgetEvenementiel',
        },
        {
          id: 'AllEvenementielBudget',
          title: 'Liste des EventBudgets',
          type: 'item',
          url: '/budgetEvenementielAll',
        },
        {
          id: 'AllEvenementielBudgetExpense',
          title: 'Liste des EventBudgets Dépenses',
          type: 'item',
          url: '/BudgetEventExpense',
        }
      ]
    },
    {
      id: 'settings',
      title: 'Paramètres',
      type: 'item',
      url: '/settings',
      icon: icons.IconSettings,
      breadcrumbs: false
    }
  ]
};

export default pages;
