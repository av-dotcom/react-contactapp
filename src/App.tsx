import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import ContactList from "./components/ContactList";
import useContacts from "./hooks/useContacts";
import ContactDialog from "./components/ContactDialog";

function App() {
  const { data } = useContacts();

  return (
    <div className="w-full flex flex-col gap-6">
      <Header nbOfContacts={data.totalElements} />
      <Routes>
        <Route path="/" element={<Navigate to={"/contacts"} />} />
        <Route path="/contacts" element={<ContactList />} />
      </Routes>

      <ContactDialog />
    </div>
  );
}

export default App;
