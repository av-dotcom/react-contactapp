import { ChangeEventHandler, FormEventHandler } from "react";
import { SubmitHandler } from "react-hook-form";

type IFormInputs = {
    profilePicture: FileList | string;
    name: string;
    title: string;
    email: string;
    address: string;
    phone: string;
  };

interface ContactFormProps {
    handleFileChange: ChangeEventHandler<HTMLInputElement>;
    handleSubmit: FormEventHandler<HTMLFormElement>;
    onSubmit:  SubmitHandler<IFormInputs>;
    register: any;
    selectedFile: File | null;
    errors: any;
  }

const ContactForm = ({handleFileChange, handleSubmit, onSubmit, register, selectedFile, errors}: ContactFormProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Pick your profile picture</span>
        </div>
        <input
          type="file"
          className="file-input file-input-bordered w-full"
          accept=".jpeg, .jpg, .png"
          onChange={handleFileChange}
        />
        <input
          type="hidden"
          {...register("profilePicture")}
          value={selectedFile?.name || ""}
        />
        <p className="text-red-500">{errors.profilePicture?.message}</p>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Name"
          {...register("name")}
        />
        <p className="text-red-500">{errors.name?.message}</p>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Title"
          {...register("title")}
        />
        <p className="text-red-500">{errors.title?.message}</p>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Email"
          {...register("email")}
        />
        <p className="text-red-500">{errors.email?.message}</p>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Address"
          {...register("address")}
        />
        <p className="text-red-500">{errors.address?.message}</p>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="number"
          className="grow"
          placeholder="Phone"
          {...register("phone")}
        />
        <p className="text-red-500">{errors.phone?.message}</p>
      </label>
      <div className="modal-action justify-between">
        <button
          type="button"
          className="btn"
          onClick={() =>
            (
              document.getElementById("contact_modal") as HTMLDialogElement
            ).close()
          }
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary text-white">
          Save contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
