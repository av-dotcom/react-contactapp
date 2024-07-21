type HeaderType = {
  toggleModal: (value: boolean) => void;
  nbOfContacts: number;
};

const Header = ({ toggleModal, nbOfContacts }: HeaderType) => {
  return (
    <div>
      <h3>Contact List ({nbOfContacts})</h3>
      <button onClick={() => toggleModal(true)} className="btn">
        <i className="bi bi-plus-square"></i> Add New Contact
      </button>
    </div>
  );
};

export default Header;
