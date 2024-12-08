import axios from '../axios';

const handleUserLogin = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

export { handleUserLogin };