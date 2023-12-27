import { lazy, ReactNode, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import BasicLayout from '../layout/BasicLayout';
import { I18nextProvider } from 'react-i18next';
import i18n from '../react-i18next-config';

const School = lazy(() => import('../pages/School'));

const lazyLoad = (children: ReactNode): ReactNode => {
    return <Suspense fallback={<h1>Loading...</h1>}>
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    </Suspense>
};

const routes: RouteObject[] = [
    {
        path: '/',
        element: <BasicLayout />,
        children: [
            {
                path: 'school/:schoolId',
                element: lazyLoad(<School />)
            }
        ]
    }
]

export default routes;