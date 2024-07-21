import { Routes, Route } from 'react-router-dom';
import ContactList from './components/ContactList';

const AppRoutes = () => (
  <Routes>
    <Route path="/contacts" element={<div>hello world</div>} />
  </Routes>
  
);

export default AppRoutes;