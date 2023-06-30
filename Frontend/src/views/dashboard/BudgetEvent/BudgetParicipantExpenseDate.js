const BudgetParicipantExpenseData = [
    {
        id: 1,
        expenseCategory: 'Supermarché',
        amount: 80,
        date: '2022-10-01',
        description: 'Achat de produits alimentaires',
        paymentMethod: 'Carte de crédit',
        location: 'Paris',
        receiptImage: 'chemin/vers/image1.jpg',
        createdAt: '2022-10-01T10:00:00',
        updatedAt: '2022-10-01T10:05:00',
        userId: 1,
        categoryId: 1,
        eventBudgetId: 1,
        userName:"William",
    },
    {
        id: 2,
        expenseCategory: 'Restaurant',
        amount: 30,
        date: '2022-10-05',
        description: 'Dîner au restaurant avec des amis',
        paymentMethod: 'Espèces',
        location: 'Lyon',
        receiptImage: 'chemin/vers/image2.jpg',
        createdAt: '2022-10-05T18:30:00',
        updatedAt: '2022-10-05T18:35:00',
        userId: 2,
        categoryId: 2,
        eventBudgetId: 2,
        userName:"William",
    },
    {
        id: 3,
        expenseCategory: 'Magasin de vêtements',
        amount: 100,
        date: '2022-10-10',
        description: 'Achat d\'une nouvelle tenue',
        paymentMethod: 'Carte de débit',
        location: 'Marseille',
        receiptImage: 'chemin/vers/image3.jpg',
        createdAt: '2022-10-10T14:00:00',
        updatedAt: '2022-10-10T14:05:00',
        userId: 1,
        categoryId: 3,
        eventBudgetId: 1,
        userName:"William",
    },
    {
        id: 4,
        expenseCategory: 'Cinéma',
        amount: 20,
        date: '2022-10-15',
        description: 'Billet pour une séance de cinéma',
        paymentMethod: 'Carte-cadeau',
        location: 'Toulouse',
        receiptImage: 'chemin/vers/image4.jpg',
        createdAt: '2022-10-15T20:00:00',
        updatedAt: '2022-10-15T20:05:00',
        userId: 2,
        categoryId: 4,
        eventBudgetId: 2,
        userName:"Ines",
    },
    {
        id: 5,
        expenseCategory: 'Station-service',
        amount: 40,
        date: '2022-10-20',
        description: 'Remplissage du réservoir d\'essence',
        paymentMethod: 'Carte de crédit',
        location: 'Bordeaux',
        receiptImage: 'chemin/vers/image5.jpg',
        createdAt: '2022-10-20T09:30:00',
        updatedAt: '2022-10-20T09:35:00',
        userId: 1,
        categoryId: 5,
        eventBudgetId: 1,
        userName:"Ines",
    },
    {
        id: 6,
        expenseCategory: 'Pharmacie',
        amount: 15,
        date: '2022-10-25',
        description: 'Achat de médicaments',
        paymentMethod: 'Espèces',
        location: 'Nantes',
        receiptImage: 'chemin/vers/image6.jpg',
        createdAt: '2022-10-25T16:45:00',
        updatedAt: '2022-10-25T16:50:00',
        userId: 2,
        categoryId: 2,
        eventBudgetId: 2,
        userName:"Ines",
    },
    {
        id: 7,
        expenseCategory: 'Boulangerie',
        amount: 10,
        date: '2022-10-28',
        description: 'Pain et viennoiseries',
        paymentMethod: 'Carte de débit',
        location: 'Lille',
        receiptImage: 'chemin/vers/image7.jpg',
        createdAt: '2022-10-28T08:00:00',
        updatedAt: '2022-10-28T08:05:00',
        userId: 1,
        categoryId: 3,
        eventBudgetId: 1,
        userName:"Ines",
    },
    {
        id: 8,
        expenseCategory: 'Café',
        amount: 5,
        date: '2022-10-30',
        description: 'Café à emporter',
        paymentMethod: 'Carte-cadeau',
        location: 'Strasbourg',
        receiptImage: 'chemin/vers/image8.jpg',
        createdAt: '2022-10-30T12:15:00',
        updatedAt: '2022-10-30T12:20:00',
        userId: 2,
        categoryId: 4,
        eventBudgetId: 2,
        userName:"Olympe",
    },
    {
        id: 9,
        expenseCategory: 'Salon de coiffure',
        amount: 25,
        date: '2022-11-05',
        description: 'Coupe de cheveux',
        paymentMethod: 'Carte de crédit',
        location: 'Nice',
        receiptImage: 'chemin/vers/image9.jpg',
        createdAt: '2022-11-05T15:30:00',
        updatedAt: '2022-11-05T15:35:00',
        userId: 1,
        categoryId: 5,
        eventBudgetId: 1,
        userName:"Olympe",
    },
    {
        id: 10,
        expenseCategory: 'Librairie',
        amount: 35,
        date: '2022-11-10',
        description: 'Achat de livres',
        paymentMethod: 'Espèces',
        location: 'Montpellier',
        receiptImage: 'chemin/vers/image10.jpg',
        createdAt: '2022-11-10T11:30:00',
        updatedAt: '2022-11-10T11:35:00',
        userId: 2,
        categoryId: 2,
        eventBudgetId: 2,
        userName:"Charles",
    },
    {
        id: 11,
        expenseCategory: 'Théâtre',
        amount: 15,
        date: '2022-11-15',
        description: 'Place de théâtre',
        paymentMethod: 'Carte de débit',
        location: 'Rennes',
        receiptImage: 'chemin/vers/image11.jpg',
        createdAt: '2022-11-15T19:00:00',
        updatedAt: '2022-11-15T19:05:00',
        userId: 1,
        categoryId: 3,
        eventBudgetId: 1,
        userName:"Nico",
    },
    {
        id: 12,
        expenseCategory: 'Fitness',
        amount: 50,
        date: '2022-11-20',
        description: 'Abonnement à la salle de sport',
        paymentMethod: 'Carte-cadeau',
        location: 'Toulon',
        receiptImage: 'chemin/vers/image12.jpg',
        createdAt: '2022-11-20T07:30:00',
        updatedAt: '2022-11-20T07:35:00',
        userId: 2,
        categoryId: 4,
        eventBudgetId: 2,
        userName:"Elene",
    },
    {
        id: 13,
        expenseCategory: 'Épicerie',
        amount: 25,
        date: '2022-11-25',
        description: 'Courses alimentaires',
        paymentMethod: 'Carte de crédit',
        location: 'Brest',
        receiptImage: 'chemin/vers/image13.jpg',
        createdAt: '2022-11-25T13:45:00',
        updatedAt: '2022-11-25T13:50:00',
        userId: 1,
        categoryId: 5,
        eventBudgetId: 1,
        userName:"Elene",
    },
    {
        id: 14,
        expenseCategory: 'Salon de beauté',
        amount: 40,
        date: '2022-11-30',
        description: 'Soin du visage',
        paymentMethod: 'Espèces',
        location: 'Grenoble',
        receiptImage: 'chemin/vers/image14.jpg',
        createdAt: '2022-11-30T16:15:00',
        updatedAt: '2022-11-30T16:20:00',
        userId: 2,
        categoryId: 2,
        eventBudgetId: 2,
        userName:"Elene",
    },
    {
        id: 15,
        expenseCategory: 'Frais de livraison',
        amount: 10,
        date: '2022-12-05',
        description: 'Frais de livraison d\'une commande en ligne',
        paymentMethod: 'Carte de débit',
        location: 'Lyon',
        receiptImage: 'chemin/vers/image15.jpg',
        createdAt: '2022-12-05T11:30:00',
        updatedAt: '2022-12-05T11:35:00',
        userId: 1,
        categoryId: 3,
        eventBudgetId: 1,
        userName:"Elene",
    },
    {
        id: 16,
        expenseCategory: 'Coiffeur',
        amount: 30,
        date: '2022-12-10',
        description: 'Coupe et couleur des cheveux',
        paymentMethod: 'Carte-cadeau',
        location: 'Marseille',
        receiptImage: 'chemin/vers/image16.jpg',
        createdAt: '2022-12-10T14:45:00',
        updatedAt: '2022-12-10T14:50:00',
        userId: 2,
        categoryId: 4,
        eventBudgetId: 2,
        userName:"Elene",
    },
    {
        id: 17,
        expenseCategory: 'Jardinage',
        amount: 20,
        date: '2022-12-15',
        description: 'Achat de plantes et d\'outils de jardinage',
        paymentMethod: 'Carte de crédit',
        location: 'Toulouse',
        receiptImage: 'chemin/vers/image17.jpg',
        createdAt: '2022-12-15T09:00:00',
        updatedAt: '2022-12-15T09:05:00',
        userId: 1,
        categoryId: 5,
        eventBudgetId: 1,
        userName:"Elene",
    },
    {
        id: 18,
        expenseCategory: 'Cadeaux',
        amount: 50,
        date: '2022-12-20',
        description: 'Achat de cadeaux de Noël',
        paymentMethod: 'Espèces',
        location: 'Paris',
        receiptImage: 'chemin/vers/image18.jpg',
        createdAt: '2022-12-20T16:30:00',
        updatedAt: '2022-12-20T16:35:00',
        userId: 2,
        categoryId: 2,
        eventBudgetId: 2,
        userName:"Elene",
    },
    {
        id: 19,
        expenseCategory: 'Réparations',
        amount: 80,
        date: '2022-12-25',
        description: 'Réparation de la voiture',
        paymentMethod: 'Carte de débit',
        location: 'Lille',
        receiptImage: 'chemin/vers/image19.jpg',
        createdAt: '2022-12-25T13:15:00',
        updatedAt: '2022-12-25T13:20:00',
        userId: 1,
        categoryId: 3,
        eventBudgetId: 1,
        userName:"Elene",
    },
];

export default BudgetParicipantExpenseData;
