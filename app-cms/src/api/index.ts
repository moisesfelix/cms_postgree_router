import { Client } from '@/types/client';
import axios from 'axios'


const API_CMS_CONNECTION = process.env.API_CMS_CONNECTION || "http://localhost:3001"
const instance = axios.create({
    baseURL: API_CMS_CONNECTION
});

class ApiCMS {
    getClients() {
        try {
            return instance.get(`/users`)
        } catch (error) {
            throw (error)
            console.error(error)
        }
    }
    createClient(data: Client) {
        try {
            console.log('test', data)
            return instance.post('/users', data)
        } catch (error) {
            throw (error)
            console.error(error)
        }
    }
    updateClient(data: Client) {
        try {
            const id = data.id
            delete data.id
            return instance.put(`/users/${id}`, data)
        } catch (error) {
            throw (error)
            console.error(error)
        }
    }
    deleteClient(id: any) {
        try {
            return instance.delete(`/users/${id}`)
        } catch (error) {
            throw (error)
            console.error(error)
        }
    }
}
const apiCMS = new ApiCMS();

export default apiCMS;
