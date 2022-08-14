import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { App } from './App';
import theme from './theme';

const el = document.getElementById('root');
const root = createRoot(el!);

root.render(
  <>
    {/** @ts-ignore */}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>
);
