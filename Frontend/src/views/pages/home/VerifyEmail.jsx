import { useParams } from 'react-router-dom';
import * as React from 'react';
import userService from 'service/userService';
import {useEffect, useState} from "react";
import Grid from '@mui/material/Grid';
import AuthWrapper1 from 'views/pages/authentication/AuthWrapper1';
import { useNavigate } from 'react-router';



const VerifyEmail =  () => {
    const  [message, setMessage]  = useState(null);
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);


    const { token } = useParams();
    const verifyUser = async () => {
        const req = await userService.verifyUser(token);
        if (req.status === 201)
        {
            setMessage("Félicitation votre email a bien été vérifier");
        }
        else
        {
            setMessage("Malheureusement votre email n'a pas pu vérifier");
        }
        setTimeout(() => {
            navigate('/')
        },5000);

    }

    useEffect(() => {
        verifyUser();
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <h1>{ message }</h1>
                            <p>Vous Allez diriger vers la page de Home dans {countdown} seconde{countdown !== 1 ? 's' : ''}</p>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </AuthWrapper1>
    );

}


export default VerifyEmail;
