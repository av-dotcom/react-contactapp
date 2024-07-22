import Contact from "./Contact";
import Pagination from "./Pagination";
import useContacts from "../hooks/useContacts";

const ContactList = () => {
  const { data, currentPage, getAllContacts } = useContacts();

  return (
    <main>
      {data?.content?.length === 0 && (
        <div>No Contacts. Please add a new contact</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.content?.length > 0 &&
          data.content.map((contact: any) => (
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
