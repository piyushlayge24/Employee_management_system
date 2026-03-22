import axios from 'axios';

const API_URL = 'https://localhost:7081/api/Employee'; // Updated to HTTPS port to avoid redirect issues

const api = axios.create({
    baseURL: API_URL,
});

export const getEmployees = async () => {
    const response = await api.get('/');
    return response.data;
};

export const getEmployeeById = async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
};

export const createEmployee = async (employee) => {
    const response = await api.post('/', employee);
    return response.data;
};

export const updateEmployee = async (id, employee) => {
    const response = await api.put(`/${id}`, employee);
    return response.data;
};

export const deleteEmployee = async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
};

export default api;
