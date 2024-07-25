import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getContact, updateContact, updatePhoto } from "../api/ContactService";
import ContactForm from "./ContactForm";
import Contact from "./Contact";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  profilePicture: yup.string().required("Profile picture is required"),
  name: yup.string().required("Name is required"),
  title: yup.string().required("Title is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().required("Phone is required"),
});

type IFormInputs = {
  profilePicture: FileList | string;
  name: string;
  title: string;
  email: string;
  address: string;
  phone: string;
};

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema) as any,
  });

  const fetchContact = async (contactId: string) => {
    try {
      const { data } = await getContact(contactId);
      setContact(data);
      // Set form values
      setValue("profilePicture", data.photoUrl || "");
      setValue("name", data.name);
      setValue("title", data.title);
      setValue("email", data.email);
      setValue("address", data.address);
      setValue("phone", data.phone);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContact(id ?? "");
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue("profilePicture", file.name, { shouldValidate: true });
    }
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (values) => {
    try {
      const updatedContact = {
        id: contact?.id,
        name: values.name,
        title: values.title,
        email: values.email,
        address: values.address,
        phone: values.phone,
        status: contact?.status,
      };
      await updateContact(updatedContact);

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("id", contact?.id || "");
        await updatePhoto(formData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setSelectedFile(null);
    }
  };

  return (
    <>
      <div className="breadcrumbs text-lg">
        <ul>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
          <li className="font-semibold">{contact?.name}</li>
        </ul>
      </div>
      {contact && (
        <div className="flex items-center gap-8">
          <Contact contact={contact} />
          <ContactForm
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            selectedFile={selectedFile}
            errors={errors}
            defaultValues={{
              profilePicture: contact.photoUrl,
              name: contact.name,
              title: contact.title,
              email: contact.email,
              address: contact.address,
              phone: contact.phone,
            }}
          />
        </div>
      )}
    </>
  );
};

export default ContactDetail;