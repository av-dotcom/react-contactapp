import Contact from "./Contact";
import Pagination from "./Pagination";
import useContacts from "../hooks/useContacts";

type ContactProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  name: string;
  title: string;
  address: string;
  status: string;
  photoUrl: string;
};

const ContactList = () => {
  const { data, currentPage, getAllContacts } = useContacts();

  return (
    <main>
      {data?.content?.length === 0 && (
        <div className="text-center">
          <h1 className="text-2xl">
            <span className="font-semibold">No contacts yet!</span><br />Add a new one
          </h1>
        </div>
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
