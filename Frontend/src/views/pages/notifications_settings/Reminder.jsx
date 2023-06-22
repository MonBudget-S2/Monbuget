import React, { useState } from 'react';
import { Card, CardContent, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

const Reminder = () => {
    const [emailReminder, setEmailReminder] = useState('');

    const handleEmailReminderChange = (event) => {
        setEmailReminder(event.target.value);
    };

    return (
        <div>
            <Card sx={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Rappels :
                    </Typography>
                    <RadioGroup value={emailReminder} onChange={handleEmailReminderChange}>
                        <FormControlLabel value="email_suivi_dettes" control={<Radio />} label="Recevoir des rappels par e-mail pour effectuer un suivi régulier des dettes" />
                        <FormControlLabel value="notification_suivi_dettes" control={<Radio />} label="Recevoir des rappels par notification pour effectuer un suivi régulier des dettes" />
                        <FormControlLabel value="email_paiements_reguliers" control={<Radio />} label="Recevoir des rappels par e-mail pour effectuer des paiements réguliers" />
                        <FormControlLabel value="notification_paiements_reguliers" control={<Radio />} label="Recevoir des rappels par notification pour effectuer des paiements réguliers" />
                    </RadioGroup>
                </CardContent>
            </Card>
        </div>
    );
};

export default Reminder;
