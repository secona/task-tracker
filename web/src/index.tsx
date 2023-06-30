import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { accountRoute } from './pages/account';
import { rootRoute } from './pages/root';
import { settingsRoute } from './pages/settings';

import './styles/global.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

export const router = createBrowserRouter([
  accountRoute,
  settingsRoute,
  rootRoute,
]);

const el = document.getElementById('root');
const root = createRoot(el!);
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools position='bottom-right' />
  </QueryClientProvider>
);
