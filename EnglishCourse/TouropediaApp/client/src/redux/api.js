import aixos from 'aixos';

const API = aixos.create({ baseURL: 'http://localhost:8080' });

export const signin = (formData) => API.post('/users/signin');
