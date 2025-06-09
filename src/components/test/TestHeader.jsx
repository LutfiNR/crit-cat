"use client";
import React from 'react';
import { Typography, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

export default function TestHeader({ timeLeft, userName, userClass, userId}) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
      <Box>
        <Typography variant="h4" component="h1">Pengerjaan Tes</Typography>
        <Typography variant="subtitle1" color="text.secondary">ID: <strong>{userId}</strong></Typography>
        <Typography variant="subtitle1" color="text.secondary">Peserta: <strong>{userName}</strong></Typography>
        <Typography variant="subtitle1" color="text.secondary">Kelas: <strong>{userClass}</strong></Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" component="div" sx={{ color: timeLeft <= 60 ? 'error.main' : 'text.primary' }}>
          {formatTime(timeLeft)}
        </Typography>
      </Box>
    </Box>
  );
}