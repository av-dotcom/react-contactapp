import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getContact } from "../api/ContactService";
import Contact from "./Contact";
interface Contact {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  photoUrl: string;
  status: string;
}

const ContactDetail = () => {
  const [contact, setContact] = useState<Contact | undefined>();
  const { id } = useParams();

  const fetchContact = async (contactId: string) => {
    try {
      const { data } = await getContact(contactId);
      setContact(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContact(id ?? "");
  }, []);

  return (
    <>
      <div className="breadcrumbs text-lg">
        <ul>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
          <li className="font-medium">{contact?.name}</li>
        </ul>
      </div>
      {contact && (
        <Contact contact={contact} />
      )}
    </>
  );
};

export default ContactDetail;
