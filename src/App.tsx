import * as React from 'react';
import { getContacts } from './api/ContactService';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import ContactList from './components/ContactList';

function App() {
  const  [data, setData] = React.useState({});
  const  [currentPage, setCurrentPage] = React.useState(0);

  const getAllContacts = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);  
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleModal = (show: boolean) => {

  };

  React.useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <Header toggleModal={toggleModal} nbOfContacts={data.totalElements} />
      <Routes>
        <Route path="/contacts" element={<ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts} />} />
      </Routes>
    </div>
  );
}

export default App;
