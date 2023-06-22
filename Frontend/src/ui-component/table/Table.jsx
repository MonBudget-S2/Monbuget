import React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import datas from './data';
import MainCard from 'ui-component/cards/MainCard';

const TableComponent = ({ onEdit, onDelete }) => {

    if (!datas || datas.length === 0) {
        return (
            <Box mt={3} textAlign="center">
                Aucune donnée disponible.
            </Box>
        );
    }

    return (
        <MainCard sx={{mx:3}}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Catégorie de dépense</TableCell>
                            <TableCell align="center">Montant dépensé</TableCell>
                            <TableCell align="center">Date de dépense</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datas.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.expenseCategory}</TableCell>
                                <TableCell align="center">{row.amountSpent}</TableCell>
                                <TableCell align="center">{row.dateSpent}</TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" color="primary" onClick={() => onEdit(row.id)}>
                                        Modifier
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={() => onDelete(row.id)}>
                                        Supprimer
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
};

export default TableComponent;
