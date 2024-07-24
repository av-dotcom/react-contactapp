import { Routes, Route, Navigate } from 'react-router-dom';
import ContactList from '../components/ContactList';
import ContactDetail from '../components/ContactDetail';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/contacts" />} />
      <Route path="/contacts" element={<ContactList />} />
      <Route path="/contacts/:id" element={<ContactDetail />} />
    </Routes>
  );
}

export default AppRoutes;