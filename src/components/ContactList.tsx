import Contact from "./Contact";
import Pagination from "./Pagination";
import useContacts from "../hooks/useContacts";
import { ContactProps } from "../types/types";

const ContactList = () => {
  const { data, currentPage, getAllContacts } = useContacts();

  return (
    <main>
      {data?.content?.length === 0 && (
        <h1 className="">No Contacts. Please add a new contact</h1>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.content?.length > 0 &&
          data.content.map((contact: ContactProps) => (
            <Contact contact={contact} key={contact.id} />
          ))}
      </div>

      {data?.content?.length > 0 && data?.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          getAllContacts={getAllContacts}
          data={data}
        />
      )}
    </main>
  );
};

export default ContactList;
