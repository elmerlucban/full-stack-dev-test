import api from './api';

const getAllTask = () => {
    return api.get('/tasks'); 
};

const findTask = (id: number) => {
    return api.get(`/tasks/${id}`); 
};

const addTask = (data: any) => {
    return api.post('/tasks', data); 
};

const removeTask = (task: number) => {
    console.log(task);
    return api.delete(`/tasks/${task}`); 
};

const completionTask = (id: number) => {
    return api.put(`/tasks/${id}`); 
};

const Tasks = {
    getAllTask,
    findTask,
    addTask,
    removeTask,
    completionTask
}

export default Tasks;