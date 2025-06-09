"use client";
import * as React from 'react';
// Import yang diperlukan dari NextAuth dan Next.js
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

// Import dari MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    // State baru untuk menu admin
    const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);

    // Mengambil data sesi login
    const { data: session } = useSession();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    // Handler baru untuk menu admin
    const handleOpenAdminMenu = (event) => {
        setAnchorElAdmin(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // Handler baru untuk menu admin
    const handleCloseAdminMenu = () => {
        setAnchorElAdmin(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* ... Bagian Logo dan Menu Navigasi (tidak berubah) ... */}
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CRIT-CAT
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <MenuItem component={Link} href='/' onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                            <MenuItem component={Link} href='/about' onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">About</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CRIT-CAT
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button component={Link} href='/' sx={{ my: 2, color: 'white', display: 'block' }}>
                            Home
                        </Button>
                        <Button component={Link} href='/about' sx={{ my: 2, color: 'white', display: 'block' }}>
                            About
                        </Button>
                    </Box>

                    {/* === BAGIAN ADMIN YANG DIPERBARUI === */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Menu Admin">
                            <IconButton onClick={handleOpenAdminMenu} color="inherit">
                                <AdminPanelSettingsIcon sx={{ width: 32, height: 32 }} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-admin"
                            anchorEl={anchorElAdmin}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElAdmin)}
                            onClose={handleCloseAdminMenu}
                        >
                            {/* Tampilkan item ini hanya jika admin sudah login */}
                            {session && session.user.role === 'admin' && (
                                <MenuItem component={Link} href="/admin/dashboard" onClick={handleCloseAdminMenu}>
                                    <Typography textAlign="center">Hasil Tes</Typography>
                                </MenuItem>
                            )}
                            {session && session.user.role === 'admin' && (
                                <MenuItem component={Link} href="/admin/question/bank" onClick={handleCloseAdminMenu}>
                                    <Typography textAlign="center">Bank Soal</Typography>
                                </MenuItem>
                            )}

                            {/* Tampilkan Logout jika sudah login, atau Login jika belum */}
                            {session ? (
                                <MenuItem onClick={() => {
                                    handleCloseAdminMenu();
                                    signOut(); // Fungsi dari NextAuth untuk logout
                                }}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            ) : (
                                <MenuItem component={Link} href="/login" onClick={handleCloseAdminMenu}>
                                    <Typography textAlign="center">Login</Typography>
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;