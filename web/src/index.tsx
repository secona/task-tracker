import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { App } from './App';
import GlobalStyles from './GlobalStyles';
import theme from './theme';

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
