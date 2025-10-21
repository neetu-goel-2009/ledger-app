import { lazy, ReactNode } from 'react';

const Accounts = lazy(() => import('./pages/Accounts'));
const Catalog = lazy(() => import('./pages/Catalog'));
const Reports = lazy(() => import('./pages/Reports'));
const Investments = lazy(() => import('./pages/Investments'));
const Insurance = lazy(() => import('./pages/Insurance'));
const SIPs = lazy(() => import('./pages/SIPs'));
const Shares = lazy(() => import('./pages/Shares'));

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const routes: RouteConfig[] = [
  {
    path: '/accounts',
    element: Accounts,
  },
  {
    path: '/catalog',
    element: Catalog,
  },
  {
    path: '/reports',
    element: Reports,
  },
  {
    path: '/investments',
    element: Investments,
  },
  {
    path: '/insurance',
    element: Insurance,
  },
  {
    path: '/sips',
    element: SIPs,
  },
  {
    path: '/shares',
    element: Shares,
  },
];
