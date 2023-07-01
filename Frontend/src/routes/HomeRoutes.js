import { lazy } from 'react';

// project imports
// import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const HomePage = Loadable(lazy(()=>import('views/pages/home/HomePage')));

const HomeRoutes = {
    path: '/',
    element: (
        <HomePage />
    )
}

export default HomeRoutes;