import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { CardActions } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const SeeButton = ({ to, budget }) => {
    return (
        <CardActions component={Link} to={to} sx={{ p: 1.25, pt: 2, pb: 2 }}>
            <Button
                variant="outlined"
                color="info"
                component={Link}
                to={to}
                startIcon={<VisibilityIcon />}
                sx={{ color: '#00000' }}
            >
            </Button>
            {budget && (
                <div>
                    <p>Budget : {budget}</p>
                </div>
            )}
        </CardActions>
        
    );
};

export default SeeButton;
