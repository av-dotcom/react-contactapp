import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//import { useEffect } from 'react';

const schema = yup.object().shape({
  profilePicture: yup.mixed().required('Profile picture is required'),
  name: yup.string().required('Name is required'),
  title: yup.string().required('Title is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address: yup.string().required('Address is required'),
  phone: yup.string().required('Phone is required'),
});

type IFormInputs = {
  profilePicture: FileList;
  name: string;
  title: string;
  email: string;
  address: string;
  phone: string;
}

const ContactDialog = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit: SubmitHandler<IFormInputs> = values => {
    console.log(values);
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
              {...register('profilePicture')}
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
            <input type="text" className="grow" placeholder="Phone" {...register('phone')} />
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