import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Notification from './Notification';
import Alert from './Alert';
import Reminder from './Reminder';

const Settings = () => {
    return (
        <Card sx={{ p: 2 }}>
            <CardContent>
                <Typography variant="h1" component="h1" gutterBottom>
                    Paramètres
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h3" component="h3" gutterBottom>
                        Notifications
                    </Typography>
                    <Notification />
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h3" component="h3" gutterBottom>
                        Alertes
                    </Typography>
                    <Alert />
                </Box>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h3" component="h3" gutterBottom>
                        Rappels
                    </Typography>
                    <Reminder />
                </Box>
            </CardContent>
        </Card>
    );
};

export default Settings;
