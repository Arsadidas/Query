import axios from "axios";

const api = 'http://localhost:3007/'

axios.defaults.baseURL = api

export interface ITodo {
    _id?: string
    text?: string
    done?: boolean
}

export const DataService = {
    async getAll() {
        return await axios.get<ITodo[]>('todos')
    },
    async create(todo: ITodo) {
        return await axios.post('todos', todo)
    },
    async delete(id: string) {
        return await axios.delete(`todos/${id}`)
    },
    async change(id: string, todo: ITodo) {
        return await axios.patch(`todos/${id}`, todo)
    }
}