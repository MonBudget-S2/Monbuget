import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';




const SumUpEvent = ({ sumUpData, participants }) => {
    console.log(sumUpData);
    console.log(participants);
    const { totalAmountPaid, expensePerPerson, transactions, debts } = sumUpData;

    const getUsernameById = (id) => {
        const participant = participants.find(p => p.userId === id);
        return participant ? participant.user.username : 'Inconnu';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };



    return (
        <Card style={{ width: '100%', backgroundColor: '#f5f5f5', padding: '1.5rem' }}>
            <CardContent>
                <Typography variant="h6" style={{ marginBottom: '1.5rem', fontWeight: 'bold', color: '#333' }}>
                    Récapitulatif des dépenses
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: '0.5rem' }}>
                    Montant total payé : {totalAmountPaid}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginBottom: '0.5rem' }}>
                    Montant des dépenses par personne : {expensePerPerson}
                </Typography>

                <Typography variant="h6" style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                    Remboursements
                </Typography>
                <List dense>
                    {transactions.map((transaction, index) => (
                        <ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', color: '#555' }}>
                            <ListItemText primary={`De: ${getUsernameById(transaction.from)}`} />
                            <ListItemText primary={`À: ${getUsernameById(transaction.to)}`} />
                            <ListItemText primary={`Montant: ${transaction.amount}€`} />
                        </ListItem>
                    ))}
                </List>

                <Typography variant="h6" style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold', color: '#333' }}>
                    Dettes
                </Typography>
                <List dense>
                    {debts.map((debt, index) => (
                        <ListItem key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', color: '#555' }}>
                            <ListItemText primary={`Débiteur: ${getUsernameById(debt.debtorId)}`} />
                            <ListItemText primary={`Créancier: ${getUsernameById(debt.creditorId)}`} />
                            <ListItemText primary={`Montant dû: ${debt.amount}€`} />
                            <ListItemText primary={`Montant restant: ${debt.remainingAmount}€`} />
                            <ListItemText primary={`Date d'échéance: ${formatDate(debt.dueDate)}`} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default SumUpEvent;
