import { createSlice, PayloadAction, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';
import apiCMS from '../api'
import { Client } from '@/types/client';

interface ClientsState {
    clients: Client[];
    filtroClient: string;
}

const initialState: ClientsState = {
    clients: [],
    filtroClient: '',
};

interface Redux {
    getState: any
    dispatch: Dispatch<any>
}

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
    try {
        const response = await apiCMS.getClients();
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const createClient = createAsyncThunk('clients/createClient',
    async (params: Client, { getState, dispatch }: Redux) => {
        try {
            const response = await apiCMS.createClient(params);
            return response?.data;
        } catch (error) {
            throw error;
            console.log(error);
        }
    });

export const updateClient = createAsyncThunk('clients/updateClient',
    async (params: Client, { getState, dispatch }: Redux) => {
        try {
            const response = await apiCMS.updateClient(params);
            dispatch(fetchClients())
            return response?.data;
        } catch (error) {
            throw error;
            console.log(error);
        }
    });

export const deleteClient = createAsyncThunk('clients/deleteClient',
    async (id: any, { getState, dispatch }: Redux) => {
        try {
            const response = await apiCMS.deleteClient(id);
            dispatch(fetchClients())
            return response?.data;
        } catch (error) {
            throw error;
            console.log(error);
        }
    });

const clientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setFiltroClient: (state, action: PayloadAction<string>) => {
            state.filtroClient = action.payload;
            if (action.payload !== '') {
                state.clients = state.clients.filter(client =>
                    client.name.toLowerCase().includes(action.payload.toLowerCase()) ||
                    client.email.toLowerCase().includes(action.payload.toLowerCase()) ||
                    client.telefone.toLowerCase().includes(action.payload.toLowerCase())
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.fulfilled, (state, action) => {
                if (action.payload) {
                    state.clients = action.payload;
                }
            })
            .addCase(createClient.fulfilled, (state, action) => {
                if (action.payload) {
                    state.clients.push(action.payload);
                }
            });
    },
});

export const { setFiltroClient } = clientsSlice.actions;

export default clientsSlice.reducer;
