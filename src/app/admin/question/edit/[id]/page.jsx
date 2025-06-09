// /src/app/admin/questions/edit/[id]/page.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import { useParams } from 'next/navigation';
import QuestionForm from '@/components/admin/QuestionForm';

export default function EditQuestionPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/questions/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setInitialData(data.data);
          }
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (!initialData) {
    return <Typography>Gagal memuat data soal.</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Edit Soal</Typography>
      <QuestionForm initialData={initialData} />
    </Container>
  );
}