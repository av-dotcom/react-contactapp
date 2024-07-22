import { Routes, Route, Navigate } from 'react-router-dom';
import ContactList from '../components/ContactList';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/contacts" />} />
      <Route path="/contacts" element={<ContactList />} />
    </Routes>
  );
}

export default AppRoutes;