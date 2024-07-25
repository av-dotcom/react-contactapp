type IFormInputs = {
  profilePicture: FileList | string;
  name: string;
  title: string;
  email: string;
  address: string;
  phone: string;
};
interface ContactFormProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: any;
  onSubmit: (data: IFormInputs) => void;
  register: any;
  selectedFile: File | null;
  errors: any;
  defaultValues?: Partial<IFormInputs>;
}

const ContactForm = ({
  handleFileChange,
  handleSubmit,
  onSubmit,
  register,
  selectedFile,
  errors,
  defaultValues,
}: ContactFormProps) => {
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
          value={defaultValues?.profilePicture || ""}
        />
        <p className="text-red-500">{errors.profilePicture?.message}</p>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Name"
          {...register("name")}
          defaultValue={defaultValues?.name || ""}
        />
        <p className="text-red-500">{errors.name?.message}</p>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Title"
          {...register("title")}
          defaultValue={defaultValues?.title || ""}
        />
        <p className="text-red-500">{errors.title?.message}</p>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Email"
          {...register("email")}
          defaultValue={defaultValues?.email || ""}
        />
        <p className="text-red-500">{errors.email?.message}</p>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Address"
          {...register("address")}
          defaultValue={defaultValues?.address || ""}
        />
        <p className="text-red-500">{errors.address?.message}</p>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="number"
          className="grow"
          placeholder="Phone"
          {...register("phone")}
          defaultValue={defaultValues?.phone || ""}
        />
        <p className="text-red-500">{errors.phone?.message}</p>
      </label>
      <div className="modal-action justify-between">
        {!defaultValues?.name && (
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
        )}
        <button type="submit" className="btn btn-primary text-white">
          {defaultValues?.name ? <>Edit Contact</> : <>Save Contact</>}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
