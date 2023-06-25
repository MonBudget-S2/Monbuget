import React, { useState } from 'react';
import { Card, CardContent, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';

const Notification = () => {
    const [notificationType, setNotificationType] = useState('');
    const [notificationFrequency, setNotificationFrequency] = useState('');

    const handleNotificationTypeChange = (event) => {
        setNotificationType(event.target.value);
    };

    const handleNotificationFrequencyChange = (event) => {
        setNotificationFrequency(event.target.value);
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Type de notification
                            </Typography>
                            <RadioGroup value={notificationType} onChange={handleNotificationTypeChange}>
                                <FormControlLabel value="nouvelles_depenses" control={<Radio />} label="Nouvelles dépenses" />
                                <FormControlLabel value="contributions_budget" control={<Radio />} label="Contributions au budget" />
                                <FormControlLabel value="remboursement_effectues" control={<Radio />} label="Remboursement effectués" />
                            </RadioGroup>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Fréquence
                            </Typography>
                            <RadioGroup value={notificationFrequency} onChange={handleNotificationFrequencyChange}>
                                <FormControlLabel value="temps_reel" control={<Radio />} label="En temps réel" />
                                <FormControlLabel value="quotidien" control={<Radio />} label="Quotidiennement" />
                                <FormControlLabel value="hebdomadaire" control={<Radio />} label="Hebdomadaire" />
                            </RadioGroup>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Notification;
