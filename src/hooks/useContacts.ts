import { useState, useEffect } from "react";
import { getContacts, saveContact } from "../api/ContactService";
import axios from "axios";

interface Contact {
  id?: string;
  name: string;
  title: string;
  email: string;
  address: string;
  phone: string;
  status: string;
  photoUrl: string;
}

const useContacts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>({});

  const fetchContacts = async () => {
    try {
      const response = await axios.get("/api/contacts");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const getAllContacts = async (page = 0, size = 9) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    //fetchContacts();
    getAllContacts();
  }, []);

  const saveContact = async (contact: Object) => {
    try {
      const response = await saveContact(contact);
      console.log(response)
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  return { loading, error, fetchContacts, saveContact, deleteContact, data, currentPage, getAllContacts };
};

export default useContacts;
