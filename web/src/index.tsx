import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import { App } from './App';
import theme from './theme';

import './styles/global.scss'

axios.defaults.validateStatus = () => true;

const el = document.getElementById('root');
const root = createRoot(el!);

root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
