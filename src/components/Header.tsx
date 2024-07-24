import { useLocation } from "react-router-dom";

type HeaderType = {
  nbOfContacts: number;
};

const Header = ({ nbOfContacts }: HeaderType) => {
  const location = useLocation();

  // Check if the current URL path matches 'contacts/:id'
  const hideHeader = /contacts\/[a-zA-Z0-9_-]+/.test(location.pathname);

  if (hideHeader) {
    return null;
  }
  return (
    <div className="w-full flex justify-between items-center gap-8">
      <h3 className="font-medium text-2xl">Contacts ({nbOfContacts})</h3>
      <button
        onClick={() => {
          (
            document.getElementById("contact_modal") as HTMLDialogElement
          ).showModal();
        }}
        className="btn"
      >
      Add New Contact
      </button>
    </div>
  );
};

export default Header;
