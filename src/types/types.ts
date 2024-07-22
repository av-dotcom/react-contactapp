// types.ts
export interface Contact {
    id: string;
    name: string;
    email: string;
    title: string;
    address: string;
    phone: string;
    status: string;
    photoUrl: string;
  }
  
  export interface FormData {
    id: string;
    file: File;
  }