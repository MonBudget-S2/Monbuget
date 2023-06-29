const expenseData = [
    // Janvier 2021
    {
        id: 1,
        expenseCategory: 'Supermarché',
        amount: 50,
        date: '2021-01-01',
        description: 'Achat de produits alimentaires',
        paymentMethod: 'Carte de crédit',
        location: 'Paris',
        receiptImage: 'chemin/vers/image1.jpg',
        createdAt: '2021-01-01T10:00:00',
        updatedAt: '2021-01-01T10:05:00',
        userId: 1,
        categoryId: 1,
        eventBudgetId: 1,
    },
    {
        id: 2,
        expenseCategory: 'Restaurant',
        amount: 30,
        date: '2021-01-05',
        description: 'Dîner au restaurant avec des amis',
        paymentMethod: 'Espèces',
        location: 'Lyon',
        receiptImage: 'chemin/vers/image2.jpg',
        createdAt: '2021-01-05T18:30:00',
        updatedAt: '2021-01-05T18:35:00',
        userId: 2,
        categoryId: 2,
        eventBudgetId: 2,
    },
    {
        id: 3,
        expenseCategory: 'Magasin de vêtements',
        amount: 100,
        date: '2021-01-10',
        description: "Achat d'une nouvelle tenue",
        paymentMethod: 'Carte de débit',
        location: 'Marseille',
        receiptImage: 'chemin/vers/image3.jpg',
        createdAt: '2021-01-10T14:00:00',
        updatedAt: '2021-01-10T14:05:00',
        userId: 1,
        categoryId: 3,
        eventBudgetId: 1,
    },
    {
        id: 4,
        expenseCategory: 'Cinéma',
        amount: 20,
        date: '2021-01-15',
        description: 'Billet pour une séance de cinéma',
        paymentMethod: 'Carte-cadeau',
        location: 'Toulouse',
        receiptImage: 'chemin/vers/image4.jpg',
        createdAt: '2021-01-15T20:00:00',
        updatedAt: '2021-01-15T20:05:00',
        userId: 2,
        categoryId: 4,
        eventBudgetId: 2,
    },

    // Février 2021
    {
        id: 5,
        expenseCategory: 'Station-service',
        amount: 40,
        date: '2021-02-01',
        description: 'Remplissage du réservoir d\'essence',
        paymentMethod: 'Carte de crédit',
        location: 'Bordeaux',
        receiptImage: 'chemin/vers/image5.jpg',
        createdAt: '2021-02-01T09:30:00',
        updatedAt: '2021-02-01T09:35:00',
        userId: 1,
        categoryId: 5,
        eventBudgetId: 1,
    },
    {
        id: 6,
        expenseCategory: 'Pharmacie',
        amount: 15,
        date: '2021-02-05',
        description: 'Achat de médicaments',
        paymentMethod: 'Espèces',
        location: 'Nantes',
        receiptImage: 'chemin/vers/image6.jpg',
        createdAt: '2021-02-05T16:45:00',
        updatedAt: '2021-02-05T16:50:00',
        userId: 2,
        categoryId: 2,
        eventBudgetId: 2,
    },
    {
        id: 7,
        expenseCategory: 'Boulangerie',
        amount: 10,
        date: '2021-02-10',
        description: 'Pain et viennoiseries',
        paymentMethod: 'Carte de débit',
        location: 'Lille',
        receiptImage: 'chemin/vers/image7.jpg',
        createdAt: '2021-02-10T08:00:00',
        updatedAt: '2021-02-10T08:05:00',
        userId: 1,
        categoryId: 3,
        eventBudgetId: 1,
    },
    {
        id: 8,
        expenseCategory: 'Café',
        amount: 5,
        date: '2021-02-15',
        description: 'Café à emporter',
        paymentMethod: 'Carte-cadeau',
        location: 'Strasbourg',
        receiptImage: 'chemin/vers/image8.jpg',
        createdAt: '2021-02-15T12:15:00',
        updatedAt: '2021-02-15T12:20:00',
        userId: 2,
        categoryId: 4,
        eventBudgetId: 2,
    },

    // Mars 2021
    {
        id: 9,
        expenseCategory: 'Salon de coiffure',
        amount: 25,
        date: '2021-03-01',
        description: 'Coupe de cheveux',
        paymentMethod: 'Carte de crédit',
        location: 'Nice',
        receiptImage: 'chemin/vers/image9.jpg',
        createdAt: '2021-03-01T15:30:00',
        updatedAt: '2021-03-01T15:35:00',
        userId: 1,
        categoryId: 5,
        eventBudgetId: 1,
    },
    {
        id: 10,
        expenseCategory: 'Librairie',
        amount: 35,
        date: '2021-03-05',
        description: 'Achat de livres',
        paymentMethod: 'Espèces',
        location: 'Montpellier',
        receiptImage: 'chemin/vers/image10.jpg',
        createdAt: '2021-03-05T11:30:00',
        updatedAt: '2021-03-05T11:35:00',
        userId: 2,
        categoryId: 2,
        eventBudgetId: 2,
    },
    {
        id: 11,
        expenseCategory: 'Théâtre',
        amount: 15,
        date: '2021-03-10',
        description: 'Place de théâtre',
        paymentMethod: 'Carte de débit',
        location: 'Rennes',
        receiptImage: 'chemin/vers/image11.jpg',
        createdAt: '2021-03-10T19:00:00',
        updatedAt: '2021-03-10T19:05:00',
        userId: 1,
        categoryId: 3,
        eventBudgetId: 1,
    },
    {
        id: 12,
        expenseCategory: 'Fast-food',
        amount: 10,
        date: '2021-03-15',
        description: 'Repas rapide',
        paymentMethod: 'Carte-cadeau',
        location: 'Reims',
        receiptImage: 'chemin/vers/image12.jpg',
        createdAt: '2021-03-15T13:00:00',
        updatedAt: '2021-03-15T13:05:00',
        userId: 2,
        categoryId: 4,
        eventBudgetId: 2,
    },
    // Avril 2021
    {
        id: 13,
        expenseCategory: 'Supermarché',
        amount: 50,
        date: '2021-04-01',
        description: 'Achat de produits alimentaires',
        paymentMethod: 'Carte de crédit',
        location: 'Paris',
        receiptImage: 'chemin/vers/image13.jpg',
        createdAt: '2021-04-01T10:00:00',
        updatedAt: '2021-04-01T10:05:00',
        userId: 1,
        categoryId: 1,
        eventBudgetId: 1,
    },
    {
        id: 14,
        expenseCategory: 'Restaurant',
        amount: 30,
        date: '2021-04-05',
        description: 'Dîner au restaurant avec des amis',
        paymentMethod: 'Espèces',
        location: 'Lyon',
        receiptImage: 'chemin/vers/image14.jpg',
        createdAt: '2021-04-05T18:30:00',
        updatedAt: '2021-04-05T18:35:00',
        userId: 2,
        categoryId: 2,
        eventBudgetId: 2,
    },
    {
        id: 15,
        expenseCategory: 'Magasin de vêtements',
        amount: 100,
        date: '2021-04-10',
        description: 'Achat d\'une nouvelle tenue',
        paymentMethod: 'Carte de débit',
        location: 'Marseille',
        receiptImage: 'chemin/vers/image15.jpg',
        createdAt: '2021-04-10T14:00:00',
        updatedAt: '2021-04-10T14:05:00',
        userId: 1,
        categoryId: 3,
        eventBudgetId: 1,
    },
    {
        id: 16,
        expenseCategory: 'Cinéma',
        amount: 20,
        date: '2021-04-15',
        description: 'Billet pour une séance de cinéma',
        paymentMethod: 'Carte-cadeau',
        location: 'Toulouse',
        receiptImage: 'chemin/vers/image16.jpg',
        createdAt: '2021-04-15T20:00:00',
        updatedAt: '2021-04-15T20:05:00',
        userId: 2,
        categoryId: 4,
        eventBudgetId: 2,
    },
    // Les dépenses pour chaque mois de l'année 2022
    // Janvier 2022
    {
        id: 17,
        expenseCategory: 'Station-service',
        amount: 40,
        date: '2022-01-01',
        description: 'Remplissage du réservoir d\'essence',
        paymentMethod: 'Carte de crédit',
        location: 'Bordeaux',
        receiptImage: 'chemin/vers/image17.jpg',
        createdAt: '2022-01-01T09:00:00',
        updatedAt: '2022-01-01T09:05:00',
        userId: 1,
        categoryId: 5,
        eventBudgetId: 1,
    },
    // Février 2022
    {
        id: 18,
        expenseCategory: 'Cadeaux',
        amount: 50,
        date: '2022-02-01',
        description: 'Achat de cadeaux',
        paymentMethod: 'Espèces',
        location: 'Paris',
        receiptImage: 'chemin/vers/image18.jpg',
        createdAt: '2022-02-01T16:30:00',
        updatedAt: '2022-02-01T16:35:00',
        userId: 2,
        categoryId: 2,
        eventBudgetId: 2,
    },
    // Mars 2022
    {
        id: 19,
        expenseCategory: 'Réparations',
        amount: 80,
        date: '2022-03-01',
        description: 'Réparation de la voiture',
        paymentMethod: 'Carte de débit',
        location: 'Lille',
        receiptImage: 'chemin/vers/image19.jpg',
        createdAt: '2022-03-01T13:15:00',
        updatedAt: '2022-03-01T13:20:00',
        userId: 1,
        categoryId: 3,
        eventBudgetId: 1,
    },
    // Avril 2022
    {
        id: 20,
        expenseCategory: 'Transport en commun',
        amount: 15,
        date: '2022-04-01',
        description: 'Pass mensuel pour les transports en commun',
        paymentMethod: 'Carte de crédit',
        location: 'Paris',
        receiptImage: 'chemin/vers/image20.jpg',
        createdAt: '2022-04-01T09:00:00',
        updatedAt: '2022-04-01T09:05:00',
        userId: 1,
        categoryId: 1,
        eventBudgetId: 1,
    },
    // ...Ajoutez les dépenses pour les mois suivants de l'année 2022 (mai à décembre) en augmentant l'ID de 1 à chaque fois
    {
        id: 21,
        expenseCategory: 'Exemple',
        amount: 50,
        date: '2022-05-01',
        description: 'Exemple de dépense',
        paymentMethod: 'Carte de crédit',
        location: 'Paris',
        receiptImage: 'chemin/vers/image21.jpg',
        createdAt: '2022-05-01T00:00:00',
        updatedAt: '2022-05-01T00:00:00',
        userId: 1,
        categoryId: 1,
        eventBudgetId: 1,
    },
    {
        id: 22,
        expenseCategory: 'Exemple',
        amount: 50,
        date: '2022-06-01',
        description: 'Exemple de dépense',
        paymentMethod: 'Carte de crédit',
        location: 'Paris',
        receiptImage: 'chemin/vers/image22.jpg',
        createdAt: '2022-06-01T00:00:00',
        updatedAt: '2022-06-01T00:00:00',
        userId: 1,
        categoryId: 1,
        eventBudgetId: 1,
    },
    {
        id: 23,
        expenseCategory: 'Exemple',
        amount: 50,
        date: '2022-07-01',
        description: 'Exemple de dépense',
        paymentMethod: 'Carte de crédit',
        location: 'Paris',
        receiptImage: 'chemin/vers/image23.jpg',
        createdAt: '2022-07-01T00:00:00',
        updatedAt: '2022-07-01T00:00:00',
        userId: 1,
        categoryId: 1,
        eventBudgetId: 1,
    },
    // ...Ajoutez les dépenses pour les mois suivants de l'année 2022 (août à décembre) en augmentant l'ID de 1 à chaque fois
    {
        id: 24,
        expenseCategory: 'Exemple',
        amount: 50,
        date: '2022-08-01',
        description: 'Exemple de dépense',
        paymentMethod: 'Carte de crédit',
        location: 'Paris',
        receiptImage: 'chemin/vers/image24.jpg',
        createdAt: '2022-08-01T00:00:00',
        updatedAt: '2022-08-01T00:00:00',
        userId: 1,
        categoryId: 1,
        eventBudgetId: 1,
    },
    {
        id: 25,
        expenseCategory: 'Exemple',
        amount: 50,
        date: '2022-09-01',
        description: 'Exemple de dépense',
        paymentMethod: 'Carte de crédit',
        location: 'Paris',
        receiptImage: 'chemin/vers/image25.jpg',
        createdAt: '2022-09-01T00:00:00',
        updatedAt: '2022-09-01T00:00:00',
        userId: 1,
        categoryId: 1,
        eventBudgetId: 1,
    },
    {
        id: 26,
        expenseCategory: 'Exemple',
        amount: 50,
        date: '2022-10-01',
        description: 'Exemple de dépense',
        paymentMethod: 'Carte de crédit',
        location: 'Paris',
        receiptImage: 'chemin/vers/image26.jpg',
        createdAt: '2022-10-01T00:00:00',
        updatedAt: '2022-10-01T00:00:00',
        userId: 1,
        categoryId: 1,
        eventBudgetId: 1,
    },
    // ...Ajoutez les dépenses pour les mois suivants de l'année 2022 (novembre et décembre) en augmentant l'ID de 1 à chaque fois
    {
        id: 27,
        expenseCategory: 'Exemple',
        amount: 50,
        date: '2022-11-01',
        description: 'Exemple de dépense',
        paymentMethod: 'Carte de crédit',
        location: 'Paris',
        receiptImage: 'chemin/vers/image27.jpg',
        createdAt: '2022-11-01T00:00:00',
        updatedAt: '2022-11-01T00:00:00',
        userId: 1,
        categoryId: 1,
        eventBudgetId: 1,
    },
    {
        id: 28,
        expenseCategory: 'Exemple',
        amount: 50,
        date: '2022-12-01',
        description: 'Exemple de dépense',
        paymentMethod: 'Carte de crédit',
        location: 'Paris',
        receiptImage: 'chemin/vers/image28.jpg',
        createdAt: '2022-12-01T00:00:00',
        updatedAt: '2022-12-01T00:00:00',
        userId: 1,
        categoryId: 1,
        eventBudgetId: 1,
    },
];

export default expenseData;
