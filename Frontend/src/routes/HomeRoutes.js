import { lazy } from 'react';

// project imports
// import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import VerifyEmail from 'views/pages/home/VerifyEmail'

const HomePage = Loadable(lazy(()=>import('views/pages/home/HomePage')));

const HomeRoutes = {
    path: '/',
    children:[
        {
            path:'/',
            element: <HomePage />

        },
        {
            path: 'user/confirm/:token',
            element: <VerifyEmail />
        }
    ]
}

export default HomeRoutes;