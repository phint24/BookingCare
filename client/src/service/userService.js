import axios from '../axios';

const handleLoginAPI = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const handleSignUpAPI = (userEmail, userPassword, userName) => {
    return axios.post('/api/sign-up', { email: userEmail, password: userPassword, userName: userName });
}

const handleFetchAllDoctorsAPI = () => {
    return axios.get('/api/doctors');
}

const handleDeleteDoctorAPI = (id) => {
    return axios.delete('/api/delete-doctor', { data: { userId: id } });
}

const handleEditDoctorAPI = (data) => {
    return axios.put('/api/edit-doctor', { data });
}

const handleCreateUserAPI = (data) => {
    return axios.post('/api/create-user', data)
}

export { handleLoginAPI, handleSignUpAPI, handleFetchAllDoctorsAPI, handleDeleteDoctorAPI, handleEditDoctorAPI, handleCreateUserAPI };