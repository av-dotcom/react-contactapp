// types.ts
export interface Contact {
    id?: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    status: string;
    photoUrl?: string;
  }
  
  export interface FormData {
    id: string;
    file: File;
  }