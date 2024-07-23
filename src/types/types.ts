// types.ts
export interface ContactProps {
  id: string;
  name: string;
  email: string;
  title: string;
  address: string;
  phone: string;
  status: string;
  photoUrl: string;
}

export interface SaveContactProps {
  name: string;
  email: string;
  title: string;
  address: string;
  phone: string;
}

export interface FormData {
  id: string;
  file: File;
}
