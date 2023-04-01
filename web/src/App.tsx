import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Index } from './pages/Index';

export const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      
      <Route path='/' element={<Index />}>
        <Route path='/' element={<>home</>} />
        <Route path='/inbox' element={<>your tasks</>} />
        <Route path='/p/:projectId' element={<>project info</>} />
        <Route path='*' element={<>404</>} />
      </Route>
    </Routes>
  );
};

