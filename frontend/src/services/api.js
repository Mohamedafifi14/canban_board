import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Tasks API
export const fetchTasks = async () => {
    const response = await api.get('/tasks/');
    return response.data;
};

export const createTask = async (taskData) => {
    const response = await api.post('/tasks/', taskData);
    return response.data;
};

export const updateTask = async (taskId, taskData) => {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
};

export const updateTaskStatus = async (taskId, status) => {
    const response = await api.patch(`/tasks/${taskId}/status?status=${status}`);
    return response.data;
};

export const updateTaskAssignee = async (taskId, assigneeId) => {
    const url = assigneeId
        ? `/tasks/${taskId}/assignee?assignee_id=${assigneeId}`
        : `/tasks/${taskId}/assignee`;
    const response = await api.patch(url);
    return response.data;
};

export const deleteTask = async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
};

// Users API
export const getUsers = async () => {
    const response = await api.get('/users/');
    return response.data;
};

export const fetchUsers = getUsers; // Alias for compatibility

export default api;
