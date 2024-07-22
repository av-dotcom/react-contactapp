import { Link } from "react-router-dom";

type ContactType = {
  contact: {
    id: string;
    name: string;
    title: string;
    email: string;
    address: string;
    phone: string;
    status: string;
    photoUrl: string;
  };
};

const Contact = ({ contact }: ContactType) => {
  return (
    <Link
      to={`/contacts/${contact.id}`}
      className="card bg-base-200 w-96 shadow-xl"
    >
      <figure className="h-64">
        <img
          src={contact.photoUrl}
          alt={contact.name}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {contact.name.substring(0, 15)}

          {contact.status === "Active" ? (
            <div className="badge badge-success">{contact.status}</div>
          ) : (
            <div className="badge badge-error">{contact.status}</div>
          )}
        </h2>
        <p>{contact.title}</p>
        <div className="card-actions justify-start">
          <div className="badge badge-outline">
            <i className="bi bi-envelope"></i> {contact.email.substring(0, 20)}
          </div>
          <div className="badge badge-outline">
            <i className="bi bi-geo"></i> {contact.address}
          </div>
          <div className="badge badge-outline">
            <i className="bi bi-telephone"></i> {contact.phone}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Contact;
