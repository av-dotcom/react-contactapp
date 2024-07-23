import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import useContacts from "../hooks/useContacts";

const schema = yup.object().shape({
  profilePicture: yup.string().required('Profile picture is required'),
  name: yup.string().required('Name is required'),
  title: yup.string().required('Title is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address: yup.string().required('Address is required'),
  phone: yup.string().required('Phone is required'),
});

type IFormInputs = {
  profilePicture: FileList | string;
  name: string;
  title: string;
  email: string;
  address: string;
  phone: string;
}

const ContactDialog = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema) as any,
  });
  const { saveContact } = useContacts();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue('profilePicture', file.name, { shouldValidate: true });
    }
  };

  const onSubmit: SubmitHandler<IFormInputs> = values => {
    // reset the form
    console.log(values);
    saveContact(values);
    reset();
    setSelectedFile(null);
    (document.getElementById('contact_modal') as HTMLDialogElement).close();
  };

  return (
    <dialog id="contact_modal" className="modal">
      <div className="modal-box flex flex-col">
        <h1 className='font-semibold text-2xl mb-4'>New contact</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
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
              {...register('profilePicture')}
              value={selectedFile?.name || ''}
            />
            <p className="text-red-500">{errors.profilePicture?.message}</p>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Name" {...register('name')} />
            <p className="text-red-500">{errors.name?.message}</p>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Title" {...register('title')} />
            <p className="text-red-500">{errors.title?.message}</p>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Email" {...register('email')} />
            <p className="text-red-500">{errors.email?.message}</p>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Address" {...register('address')} />
            <p className="text-red-500">{errors.address?.message}</p>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input type="number" className="grow" placeholder="Phone" {...register('phone')} />
            <p className="text-red-500">{errors.phone?.message}</p>
          </label>
          <div className="modal-action justify-between">
            <button type="button" className="btn" onClick={() => (document.getElementById('contact_modal') as HTMLDialogElement).close()}>Cancel</button>
            <button type="submit" className="btn btn-primary text-white">Save contact</button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ContactDialog;