import { useForm, SubmitHandler, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { saveContact, updatePhoto } from "../api/ContactService";
import ContactForm from "./ContactForm";

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

const ContactDialog = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema) as any,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue("profilePicture", file.name, { shouldValidate: true });
    }
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (values) => {
    try {
      const contact = {
        name: values.name,
        title: values.title,
        email: values.email,
        address: values.address,
        phone: values.phone,
        status: "Active",
      };
      const response = await saveContact(contact);
      console.log(response);
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("id", response.data.id);
        await updatePhoto(formData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setSelectedFile(null);
      (document.getElementById("contact_modal") as HTMLDialogElement).close();
    }
  };

  return (
    <dialog id="contact_modal" className="modal">
      <div className="modal-box flex flex-col">
        <h1 className="font-semibold text-2xl mb-4">Add New contact</h1>
        <ContactForm
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          selectedFile={selectedFile}
          errors={errors}
          defaultValues={{}}
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ContactDialog;
