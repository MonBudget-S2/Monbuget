import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteButton = ({ to }) => {
    return (
        <CardActions component={Link} to={to} sx={{ p: 1.25, pt: 2, pb: 2 }}>
            <Button
                variant="outlined"
                color="error"
                component={Link}
                to={to}
                startIcon={<DeleteIcon />}
                sx={{ color: '#00000' }}
            >
            </Button>
        </CardActions>
    );
};

export default DeleteButton;