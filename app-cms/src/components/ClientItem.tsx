import React, { useState } from 'react';
import { ListItem, ListItemText, ListItemIcon, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { deleteClient, updateClient } from '@/store/clientsSlice';

interface ClientItemProps {
    id: string;
    name: string;
    email: string;
    telefone: string;
    coord_x: number;
    coord_y: number;
    handleDelete: (id: string) => void;
}

const ClientItem: React.FC<ClientItemProps> = ({ id, name, email, telefone, coord_x, coord_y, handleDelete }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editedInfo, setEditedInfo] = useState({ name, email, telefone, coord_x, coord_y });
    const dispatch = useDispatch<AppDispatch>()
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setOpenDialog(true);
        handleClose();
    };

    const onDelete = () => {
        dispatch(deleteClient(id));
        handleClose();
    };

    const handleSave = () => {
        dispatch(updateClient({
            id,
            name: editedInfo.name,
            email: editedInfo.email,
            telefone: editedInfo.telefone + 7777,
            coord_x: Number(editedInfo.coord_x),
            coord_y: Number(editedInfo.coord_y)
        }))
        setOpenDialog(false);
    };

    return (
        <React.Fragment>
            <ListItem>
                <ListItemIcon>
                    <EmailIcon />
                </ListItemIcon>
                <ListItemText primary={name} secondary={email} />
                <ListItemIcon>
                    <PhoneIcon />
                </ListItemIcon>
                <ListItemText secondary={telefone} />
                <ListItemIcon>
                    <IconButton
                        aria-label="more"
                        aria-controls="client-options"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="client-options"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleEdit}>
                            <ListItemIcon>
                                <EditIcon />
                            </ListItemIcon>
                            Editar
                        </MenuItem>
                        <MenuItem onClick={onDelete}>
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            Deletar
                        </MenuItem>
                    </Menu>
                </ListItemIcon>
            </ListItem>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Editar Informações</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nome"
                        value={editedInfo.name}
                        onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        value={editedInfo.email}
                        onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Telefone"
                        value={editedInfo.telefone}
                        onChange={(e) => setEditedInfo({ ...editedInfo, telefone: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Coordenada X"
                        value={editedInfo.coord_x}
                        onChange={(e) => setEditedInfo({ ...editedInfo, coord_x: Number(e.target.value) })}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Coordenada Y"
                        value={editedInfo.coord_y}
                        onChange={(e) => setEditedInfo({ ...editedInfo, coord_y: Number(e.target.value) })}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Salvar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default ClientItem;
