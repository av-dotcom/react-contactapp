import { useState, useEffect } from "react";
import { getContacts,  } from "../api/ContactService";
import axios from "axios";

const useContacts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>({});

  const getAllContacts = async (page = 0, size = 9) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return { loading, error, deleteContact, data, currentPage, getAllContacts };
};

export default useContacts;
