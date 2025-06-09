// /src/app/admin/question-bank/page.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Box, IconButton } from '@mui/material';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    setLoading(true);
    const res = await fetch('/api/questions');
    const data = await res.json();
    if (data.success) {
      setQuestions(data.questions);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);
  
  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
        return;
    }
    try {
        const res = await fetch(`/api/questions/${id}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
            alert('Soal berhasil dihapus!');
            fetchQuestions(); // Muat ulang data
        } else {
            alert('Gagal menghapus soal: ' + data.message);
        }
    } catch (error) {
        alert('Terjadi kesalahan pada server.');
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>Bank Soal</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          href="/admin/question/new"
          LinkComponent={Link}
        >
          Tambah Soal
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '60%' }}>Teks Soal (Tier 1)</TableCell>
              <TableCell align="right">Kesulitan (b)</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((q) => (
              <TableRow key={q._id}>
                <TableCell>{q.tier1Text.substring(0, 100)}...</TableCell>
                <TableCell align="right">{q.difficulty.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <IconButton component={Link} href={`/admin/question/edit/${q._id}`} color="primary">
                      <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(q._id)} color="error">
                      <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}