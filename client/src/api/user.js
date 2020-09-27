import API from '@config/api';

const getContacts = () => API.get(`/user/contacts/`);
const deleteContact = id => API.delete(`/user/contact/${id}`);
const addContact = data => API.post('/user/contact', data);
const saveContact = (id, data) => API.patch(`/user/contact/${id}`, data);


export {
  getContacts,
  deleteContact,
  addContact,
  saveContact
};
