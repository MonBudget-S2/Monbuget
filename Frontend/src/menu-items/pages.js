// assets
import { IconKey, IconMoneybag, IconBusinessplan, IconBrightness, IconSettings } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconMoneybag,
  IconBusinessplan,
  IconBrightness,
  IconSettings
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  // title: 'Vue d\'ensemble',
  type: 'group',
  children: [
    {
      id: 'ManageIncome',
      title: 'Gestion des revenus',
      // type: 'collapse',
      type: 'item',
      url: '/income',
      icon: icons.IconBusinessplan
    },
    {
      id: 'ManageExpense',
      title: 'Gestion des dépenses',
      type: 'collapse',
      icon: icons.IconMoneybag,

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
          url: '/addexpense'
        }
      ]
    },
    {
      id: 'ManageCategoricalBudget',
      title: 'Gestion des budgets catégoriels',
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
          url: '/budgetallocation'
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
