import axios from "axios";

const tasksApi = axios.create({
    baseURL:'http://localhost:8000/tasks/tasks/'
})

export const getAllTasks = () => tasksApi.get('')
export const getTask = (id) => tasksApi.get(`${id}`)
export const createTask = (task) => tasksApi.post('', task)
export const deleteTask = (id) => tasksApi.delete(`${id}`)
export const updateTask = (id, task) => tasksApi.put(`${id}/`, task)
export const moveTask = (id, ordering) => tasksApi.post(`${id}/change_order/`, ordering)