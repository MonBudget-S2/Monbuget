import React from 'react';
import { Button, Typography, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

const SeeAllButton = ({ to, title }) => {
    return (

        <CardActions component={Link} to={to} sx={{ p: 1.25, pt: 2, pb: 2, justifyContent: 'center' }}>
            <Button variant="contained" color="secondary" component={Link} to={to}>
                <Typography style={{ color: 'white' }} variant="subtitle1">
                    {title}
                </Typography>
            </Button>
        </CardActions>
    );
};

export default SeeAllButton;
