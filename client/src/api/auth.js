import API from '@config/api';

const login = creds => API.post('/auth', creds);

export {login};
