import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { accountRoute } from './pages/account';
import { rootRoute } from './pages/root';
import { settingsRoute } from './pages/settings';

import { DEFAULT_PREVIOUS, PreviousContext } from './hooks/usePrevious';

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

const App = () => {
  const [previous, setPrevious] = React.useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <PreviousContext.Provider
        value={{
          value: previous,
          set: setPrevious,
          setToHere: () => setPrevious(location.pathname),
          reset: () => setPrevious(DEFAULT_PREVIOUS),
        }}
      >
        <RouterProvider router={router} />
      </PreviousContext.Provider>
      <ReactQueryDevtools position='bottom-right' />
    </QueryClientProvider>
  );
};

const el = document.getElementById('root');
const root = createRoot(el!);
root.render(<App />);
