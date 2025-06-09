// /src/app/admin/submission/[id]/page.jsx
"use client"; // Pastikan ini ada di baris paling atas

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, Paper, Box, CircularProgress, Grid, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function SubmissionDetailPage() {
    const params = useParams();
    const id  = params.id;
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`/api/admin/submissions/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setSubmission(data.data);
                    }
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    if (!submission) {
        return <Typography>Data tidak ditemukan.</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>Detail Hasil Tes</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Informasi Peserta</Typography>
                        <List>
                            <ListItem><ListItemText primary="Nama" secondary={submission.userInfo.name} /></ListItem>
                            <ListItem><ListItemText primary="Kelas" secondary={submission.userInfo.studentClass} /></ListItem>
                            <ListItem><ListItemText primary="ID/NIS" secondary={submission.userInfo.studentId} /></ListItem>
                        </List>
                    </Paper>
                    <Paper sx={{ p: 2, mt: 2 }}>
                        <Typography variant="h6">Ringkasan Tes</Typography>
                        <List>
                            <ListItem><ListItemText primary="Theta Final" secondary={submission.finalTheta.toFixed(4)} /></ListItem>
                            <ListItem><ListItemText primary="Alasan Berhenti" secondary={submission.stoppingRule} /></ListItem>
                            <ListItem><ListItemText primary="Tanggal Tes" secondary={new Date(submission.createdAt).toLocaleString('id-ID')} /></ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Riwayat Jawaban (Response History)</Typography>
                        <List>
                            {submission.responseHistory.map((item, index) => (
                                <React.Fragment key={index}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemText
                                            primary={`Soal ${index + 1} (ID: ${item.questionId})`}
                                            secondary={
                                                <Box component="span" sx={{ display: 'block', mt: 1 }}>
                                                    <Typography component="span" variant="body2">Skor: {item.score}</Typography> |
                                                    <Typography component="span" variant="body2" sx={{ ml: 1 }}>Pθ: {item.pCorrect.toFixed(4)}</Typography> |
                                                    <Typography component="span" variant="body2" sx={{ ml: 1 }}>Qθ: {item.pCorrect.toFixed(4)}</Typography> |
                                                    <Typography component="span" variant="body2" sx={{ ml: 1 }}>Iθ: {item.informationFunction.toFixed(4)}</Typography> |
                                                    <Typography component="span" variant="body2" sx={{ ml: 1 }}>θ Awal: {item.thetaBefore.toFixed(4)}</Typography> |
                                                    <Typography component="span" variant="body2" sx={{ ml: 1 }}>θ Akhir: {item.thetaAfter.toFixed(4)}</Typography> |
                                                    <Typography component="span" variant="body2" sx={{ ml: 1 }}>SE: {item.se.toFixed(4)}</Typography> |
                                                    <Typography component="span" variant="body2" sx={{ ml: 1 }}>SE Difference: {item.seDifference?.toFixed(6)}</Typography>

                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}