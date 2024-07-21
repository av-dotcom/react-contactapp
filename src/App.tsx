import * as React from 'react';
import { getContacts } from './api/ContactService';

function App() {
  const  [data, setData] = React.useState({});
  const  [currentPage, setCurrentPage] = React.useState(0);

  const getAllContacts = async (page: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/contacts?page=${page}`);
      const data = await response.json();
      setData(data);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <h1 className="text-5xl font-medium">Hello world</h1>
    </div>
  );
}

export default App;
