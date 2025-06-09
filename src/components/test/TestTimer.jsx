// /src/components/test/TestTimer.jsx
"use client";

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TestTimer = ({ timeLeft }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <AccessTimeIcon sx={{ mr: 1, color: 'primary.main' }} />
      <Typography variant="h6" component="div" sx={{ fontWeight: 'medium', color: timeLeft <= 60 ? 'error.main' : 'text.primary' }}>
        Sisa Waktu: {formatTime(timeLeft)}
      </Typography>
    </Box>
  );
};

export default TestTimer;