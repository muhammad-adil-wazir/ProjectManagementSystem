import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from './layouts/SidebarLayout';
import BaseLayout from './layouts/BaseLayout';

import SuspenseLoader from './components/SuspenseLoader';

const Loader = (Component:any) => (props:any) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages

const Overview = Loader(lazy(() => import('./content/overview')));
const Login = Loader(lazy(() => import('./content/pages/Components/Login')));

// Dashboards

const Main = Loader(lazy(() => import('./content/dashboards/Main')));

// Applications


const UserProfile = Loader(lazy(() => import('./content/applications/Users/profile')));
// Components

const User = Loader(lazy(() => import('./content/pages/Components/Lecture')));
const DataTable = Loader(lazy(() => import('./components/DataTables')));
const Lecture = Loader(lazy(() => import('./content/pages/Components/Lecture')));

// Status

const Status404 = Loader(lazy(() => import('./content/pages/Status/Status404')));
//const routes: RouteObject[] = [
const routes = (isLoggedIn) => [
  {
    path: 'login',
    element: <BaseLayout />,
    children: [
      {
            path: '',
            element: <Login />
      },
      {
        path: 'login',
        element: (
          <Navigate
                to="/login"
            replace
          />
        )
        },
        
      {
        path: '*',
        element: <Status404 />
      },
    ]
  },
  {
    path: '*',
      element: (isLoggedIn ?
          <SidebarLayout /> : <Navigate
              to="/login"
              replace
          />
      ),
    children: [
      {
        path: '',
            element: <Lecture />
      },
    ]
  },
  {
      path: 'management',
      element: (isLoggedIn ? 
          <SidebarLayout /> : <Navigate
              to="/login"
              replace
          />
    ),
    children: [
      {
        path: '',
        element: (
          <Navigate
            to="/management/lecture"
            replace
          />
        )
      },
      {
          path: 'lecture',
          element: <Lecture />
        },
    ]
    },
];


export default routes;
