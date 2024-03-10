import React, { useEffect, useState } from 'react';
import { List, TextField, InputAdornment, IconButton } from '@mui/material';
import ClientItem from './ClientItem';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchClients } from '@/store/clientsSlice';
import SearchIcon from '@mui/icons-material/Search';

const ClientList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const clients = useSelector((state: RootState) => state.clients.clients);
    const [filtro, setFiltro] = useState<string>('');

    useEffect(() => {
        dispatch(fetchClients());
    }, [dispatch]);

    const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro(event.target.value);
    };

    const clientsFiltrados = clients.filter((client: any) =>
        client.name.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div>
            <TextField
                label="Filtrar"
                value={filtro}
                onChange={handleFiltroChange}
                fullWidth
                margin="normal"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton size="small">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <List>
                {clientsFiltrados.map((client: any) => (
                    <ClientItem key={client.id} {...client} />
                ))}
            </List>
        </div>
    );
};

export default ClientList;
