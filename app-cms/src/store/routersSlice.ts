import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Point {
    x: number;
    y: number;
    name: string;
}

interface RouteState {
    startPoint: Point;
    clientsData: Point[];
    pointsByRoute: number;
    numDrivers: number;
    routes: Point[][];
    loading: boolean;
    error: string | null;
    optimizedRoutes: Point[][],
}

const initialState: RouteState = {
    startPoint: { x: 0, y: 0, name: 'Empresa' },
    clientsData: [],
    pointsByRoute: 0,
    numDrivers: 0,
    routes: [],
    optimizedRoutes: [],
    loading: false,
    error: null,
};


export const getTheBestRouter = createAsyncThunk('routers/getTheBestRouter',
    async (params: any) => {
        try {
            const response = await axios.post('http://localhost:3001/routers', params);
            const routes: Point[][] = response.data;
            return routes
        } catch (error) {
            throw error;
        }
    }
);



const routersSlice = createSlice({
    name: 'routers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTheBestRouter.fulfilled, (state, action) => {
                if (action.payload) {
                    state.optimizedRoutes = action.payload;
                }
            })
    },
});

export default routersSlice.reducer;
