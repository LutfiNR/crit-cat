// /src/app/admin/dashboard/page.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Box } from '@mui/material';
import Link from 'next/link';

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/submissions')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSubmissions(data.data);
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Dashboard Hasil Tes</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nama Peserta</TableCell>
              <TableCell align="right">Theta Final</TableCell>
              <TableCell>Alasan Berhenti</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((sub) => (
              <TableRow key={sub._id}>
                <TableCell>{sub.userInfo.name}</TableCell>
                <TableCell align="right">{sub.finalTheta.toFixed(3)}</TableCell>
                <TableCell>{sub.stoppingRule}</TableCell>
                <TableCell>{new Date(sub.createdAt).toLocaleString('id-ID')}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    href={`/admin/submission/${sub._id}`}
                    LinkComponent={Link}
                  >
                    Lihat Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}