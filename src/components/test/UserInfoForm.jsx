// /src/components/test/UserInfoForm.jsx
"use client";

import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SchoolIcon from '@mui/icons-material/School';

const UserInfoForm = ({ onStartTest }) => {
  const [formData, setFormData] = useState({
    name: '',
    studentClass: '',
    studentId: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Hapus error saat pengguna mulai mengetik
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama tidak boleh kosong';
    if (!formData.studentClass.trim()) newErrors.studentClass = 'Kelas tidak boleh kosong';
    if (!formData.studentId.trim()) newErrors.studentId = 'Nomor Induk / ID tidak boleh kosong';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true jika tidak ada error
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onStartTest(formData);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', minHeight: '80vh' }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, width: '100%', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <SchoolIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
            Informasi Peserta Tes
          </Typography>
          <Typography color="text.secondary">
            Harap isi data diri Anda sebelum memulai.
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nama Lengkap"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="studentClass"
            label="Kelas"
            name="studentClass"
            value={formData.studentClass}
            onChange={handleChange}
            error={!!errors.studentClass}
            helperText={errors.studentClass}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="studentId"
            label="Nomor Induk / ID"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            error={!!errors.studentId}
            helperText={errors.studentId}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            Mulai Tes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserInfoForm;