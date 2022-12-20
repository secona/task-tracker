import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import axios from 'axios';
import { App } from './App';
import GlobalStyles from './GlobalStyles';
import theme from './theme';

axios.defaults.validateStatus = () => true;

const el = document.getElementById('root');
const root = createRoot(el!);

root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
