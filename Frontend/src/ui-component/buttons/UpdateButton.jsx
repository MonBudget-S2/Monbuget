import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const UpdateButton = ({ to }) => {
    return (
        <CardActions component={Link} to={to} sx={{ p: 1.25, pt: 2, pb: 2 }}>
            <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to={to}
                startIcon={<EditIcon />}
                sx={{ color: '#00000' }}
            >
            </Button>
        </CardActions>
    );
};

export default UpdateButton;
