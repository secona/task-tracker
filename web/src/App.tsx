import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Index } from './pages/Index';
import { Home } from './pages/Home';
import { Inbox } from './pages/Inbox';
import { Project } from './pages/Project';
import { NotFound } from './pages/NotFound';

export const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      
      <Route path='/' element={<Index />}>
        <Route path='/' element={<Home />} />
        <Route path='/inbox' element={<Inbox />} />
        <Route path='/p/:projectId' element={<Project />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};

