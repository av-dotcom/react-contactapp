type HeaderType = {
  toggleModal: (value: boolean) => void;
  nbOfContacts: number;
};

const Header = ({ toggleModal, nbOfContacts }: HeaderType) => {
  return (
    <div className="w-full flex justify-between items-center gap-8">
      <h3 className="font-medium text-2xl">Contacts ({nbOfContacts})</h3>
      <button onClick={() => toggleModal(true)} className="btn">
        <i className="bi bi-plus-square"></i> Add New Contact
      </button>
    </div>
  );
};

export default Header;
