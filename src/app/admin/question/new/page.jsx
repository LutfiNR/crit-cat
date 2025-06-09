// /src/app/admin/questions/new/page.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import QuestionForm from '@/components/admin/QuestionForm'; // Kita akan buat komponen ini

export default function AddQuestionPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Tambah Soal Baru</Typography>
      <QuestionForm />
    </Container>
  );
}