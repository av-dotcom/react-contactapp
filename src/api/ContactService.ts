import axios from "axios";

const API_URL = 'http://localhost:8080/contacts';

export async function saveContact(contact: any) {
    return await axios.post(API_URL, contact);
}

export async function getContacts(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getContact(id: string) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function udpateContact(contact: any) {
    return await axios.post(API_URL, contact);
}

export async function udpatePhoto(formData: any) {
    return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteContact(id: string) {
    return await axios.delete(`${API_URL}/${id}`);
}