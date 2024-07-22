import { useState, useEffect } from "react";
import { getContacts } from "../api/ContactService";
import axios from "axios";

interface Contact {
  id: string;
  name: string;
  title: string;
  email: string;
  address: string;
  phone: string;
  status: string;
  photoUrl: string;
}

const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>({});

  const fetchContacts = async () => {
    try {
      const response = await axios.get("/api/contacts");
      setContacts(response.data);
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

  const addContact = async (contact: Contact) => {
    try {
      const response = await axios.post("/api/contacts", contact);
      setContacts([...contacts, response.data]);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  return { contacts, loading, error, fetchContacts, addContact, deleteContact, data, currentPage, getAllContacts };
};

export default useContacts;
