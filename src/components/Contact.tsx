import { Link } from "react-router-dom";

type ContactType = {
  contact: {
    id: number;
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
    <Link to={`/contacts/${contact.id}`}>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={contact.photoUrl} alt={contact.name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {contact.name.substring(0, 15)}

            {contact.status === "Active" ? (
              <div className="badge badge-success">{contact.status}active</div>
            ) : (
              <div className="badge badge-error">{contact.status}offline</div>
            )}
          </h2>
          <p>{contact.title}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">
              <i className="bi bi-envelope"></i>{" "}
              {contact.email.substring(0, 20)}
            </div>
            <div className="badge badge-outline">
              <i className="bi bi-geo"></i> {contact.address}
            </div>
            <div className="badge badge-outline">
              <i className="bi bi-telephone"></i> {contact.phone}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Contact;
