// pages/clients.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import ClientList from '../components/ClientList';

const ClientsPage: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Clients
      </Typography>
      <ClientList />
    </Container>
  );
};

export default ClientsPage;
