import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { App } from './App';

import './styles/global.scss';

axios.defaults.validateStatus = () => true;

const queryClient = new QueryClient();

const el = document.getElementById('root');
const root = createRoot(el!);

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
