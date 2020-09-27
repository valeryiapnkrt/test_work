import API from '@config/api';

const register = creds => API.post('/register', creds);

export {register};