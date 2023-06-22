import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const CreateButton = ({ to, title }) => {
    return (
        <Button variant="contained" color="primary" component={Link} to={to}>
            <Typography  style={{ color: 'white' }} variant="subtitle1">
                + {title}
            </Typography>
        </Button>
    );
};

export default CreateButton;
