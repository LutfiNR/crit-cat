// /src/components/test/TestGuide.jsx
"use client";

import React from 'react';
import {
  Container, Typography, Button, Box, Paper, List,
  ListItem, ListItemIcon, ListItemText, Divider
} from '@mui/material';

// Ikon-ikon untuk memperjelas setiap poin
import ArticleIcon from '@mui/icons-material/Article';
import WifiIcon from '@mui/icons-material/Wifi';
import BlockIcon from '@mui/icons-material/Block';
import RefreshIcon from '@mui/icons-material/Refresh';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TimerIcon from '@mui/icons-material/Timer';
import VpnKeyIcon from '@mui/icons-material/VpnKey'; // <-- Ikon baru
import PersonIcon from '@mui/icons-material/Person';   // <-- Ikon baru

const TestGuide = ({ onStartTest }) => {
  const handleStart = () => {
    onStartTest();
  };

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 4, md: 6 }, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <ArticleIcon color="primary" sx={{ fontSize: 52, mb: 1.5 }} />
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }} textAlign="center">
            Petunjuk Pengerjaan Tes
          </Typography>
          <Typography color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
            Harap baca dan pahami semua petunjuk di bawah ini sebelum memulai.
          </Typography>
        </Box>
        
        <Divider sx={{ my: 3 }} />

        <List sx={{ width: '100%' }}>
          {/* Petunjuk Baru Ditambahkan di Sini */}
          <ListItem>
            <ListItemIcon>
              <VpnKeyIcon color="action" />
            </ListItemIcon>
            <ListItemText 
              primary="Anda akan diberi kode akses" 
              secondary="Sesi pengerjaan ini hanya bisa diakses dengan kode akses yang telah diberikan."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PersonIcon color="action" />
            </ListItemIcon>
            <ListItemText 
              primary="Pastikan data diri Anda sudah benar" 
              secondary="Data yang telah Anda isi akan digunakan untuk laporan hasil akhir tes Anda."
            />
          </ListItem>
          <Divider component="li" sx={{ my: 1.5, mx: 2 }} />

          {/* Petunjuk yang sudah ada sebelumnya */}
          <ListItem>
            <ListItemIcon>
              <WifiIcon color="action" />
            </ListItemIcon>
            <ListItemText 
              primary="Pastikan koneksi internet Anda stabil" 
              secondary="Koneksi yang tidak stabil dapat mengganggu jalannya tes." 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <RefreshIcon color="action" />
            </ListItemIcon>
            <ListItemText 
              primary="Jangan me-refresh halaman browser" 
              secondary="Me-refresh halaman (F5 atau reload) akan menghentikan sesi tes Anda secara paksa." 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BlockIcon color="action" />
            </ListItemIcon>
            <ListItemText 
              primary="Tidak bisa kembali ke soal sebelumnya" 
              secondary="Setelah Anda melanjutkan ke soal berikutnya, Anda tidak dapat mengubah jawaban soal yang telah dilewati." 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MenuBookIcon color="action" />
            </ListItemIcon>
            <ListItemText 
              primary="Baca setiap soal dengan teliti" 
              secondary="Pahami pertanyaan dan semua opsi jawaban sebelum membuat pilihan." 
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <TimerIcon color="action" />
            </ListItemIcon>
            <ListItemText 
              primary="Perhatikan sisa waktu" 
              secondary="Timer akan berjalan di pojok atas layar. Tes akan berakhir otomatis jika waktu habis." 
            />
          </ListItem>
        </List>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              onClick={handleStart}
              variant="contained"
              size="large"
              sx={{ 
                py: 1.5, 
                px: 6, 
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '50px'
              }}
            >
              Saya Mengerti dan Next
            </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TestGuide;