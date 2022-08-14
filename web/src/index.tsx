import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.scss'

const el = document.getElementById('root');
const root = createRoot(el!);
root.render(<App />);
