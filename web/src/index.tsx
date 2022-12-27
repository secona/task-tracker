import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { App } from './App';

import './styles/global.scss';

axios.defaults.validateStatus = () => true;

const el = document.getElementById('root');
const root = createRoot(el!);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
