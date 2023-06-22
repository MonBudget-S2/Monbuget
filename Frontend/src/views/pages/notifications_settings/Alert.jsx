import React, { useState } from 'react';
import { Card, CardContent, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

const Alert = () => {
    const [emailAlert, setEmailAlert] = useState('');

    const handleEmailAlertChange = (event) => {
        setEmailAlert(event.target.value);
    };

    return (
        <div>
            <Card sx={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Alerte :
                    </Typography>
                    <RadioGroup value={emailAlert} onChange={handleEmailAlertChange}>
                        <FormControlLabel value="email_proche_echeance" control={<Radio />} label="Recevoir une alerte par e-mail pour les dettes dont l'échéance est proche" />
                        <FormControlLabel value="notification_proche_echeance" control={<Radio />} label="Recevoir une alerte par notification pour les dettes dont l'échéance est proche" />
                        <FormControlLabel value="email_paiement_retard" control={<Radio />} label="Recevoir une alerte par e-mail pour les paiements en retard" />
                        <FormControlLabel value="notification_paiement_retard" control={<Radio />} label="Recevoir une alerte par notification pour les paiements en retard" />
                    </RadioGroup>
                </CardContent>
            </Card>
        </div>
    );
};

export default Alert;
