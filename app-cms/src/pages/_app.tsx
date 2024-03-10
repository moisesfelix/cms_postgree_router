import { AppProps } from 'next/app';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Button } from '@mui/material';
import { Menu as MenuIcon, PersonAdd as PersonAddIcon, Inbox as InboxIcon, Person as PersonIcon, Route as RouteIcon } from '@mui/icons-material';
import { Box } from '@mui/material';
import AddClientDialog from '../components/AddClientDialog';
import NextLink from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleAddClient = () => {
    setOpenDialog(true);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ display: 'flex' }}>
          <Drawer
            variant="permanent"
            anchor="left"
            open={open}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              width: 240,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
              },
            }}
          >
            <Toolbar>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAddIcon />}
                onClick={handleAddClient}
                sx={{ borderRadius: '20', height: '54px', fontSize: '1rem', marginTop: '10px' }}
              >
                Novo Cliente
              </Button>
            </Toolbar>
            <List>
              <NextLink href="/router" passHref>
                <ListItem button component="a">
                  <ListItemIcon>
                    <RouteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Roterizador" />
                </ListItem>
              </NextLink>
              <NextLink href="/clients" passHref>
                <ListItem button>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Clientes" />
                </ListItem>
              </NextLink>
            </List>
          </Drawer>
          <Box sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
            <Component {...pageProps} />
          </Box>
        </Container>
        <AddClientDialog open={openDialog} onClose={() => setOpenDialog(false)} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
