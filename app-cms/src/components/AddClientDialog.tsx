import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { createClient } from '@/store/clientsSlice';

interface AddClientDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddClientDialog: React.FC<AddClientDialogProps> = ({ open, onClose }) => {
  const [editedInfo, setEditedInfo] = useState({
    name: '',
    email: '',
    telefone: '',
    coord_x: '',
    coord_y: ''
  });

  const dispatch = useDispatch<AppDispatch>()

  const handleSave = () => {
    console.log('Informações salvas:', editedInfo);
    const client = {
      name: editedInfo.name,
      email: editedInfo.email,
      telefone: editedInfo.telefone,
      coord_x: parseFloat(editedInfo.coord_x),
      coord_y: parseFloat(editedInfo.coord_y)
    }
    console.log(client)
    dispatch(createClient(client))
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Novo client</DialogTitle>
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
          onChange={(e) => setEditedInfo({ ...editedInfo, coord_x: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Coordenada Y"
          value={editedInfo.coord_y}
          onChange={(e) => setEditedInfo({ ...editedInfo, coord_y: e.target.value })}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddClientDialog;
