import { useState, useEffect } from "react";
import axios from "axios";

interface Contact {
  id: string;
  name: string;
  email: string;
  // add other fields as necessary
}

const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchContacts();
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

  return { contacts, loading, error, fetchContacts, addContact, deleteContact };
};

export default useContacts;
