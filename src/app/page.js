"use client";
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles'; // Untuk mengakses theme jika diperlukan

export default function HomePage() {
  const theme = useTheme(); // Akses objek tema MUI

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: theme.spacing(4), md: theme.spacing(8) }, // Padding vertikal responsif
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Bagian Hero */}
      <Box
        textAlign="center"
        my={4} // Margin atas & bawah standar dari MUI
        sx={{
          mb: { xs: theme.spacing(6), md: theme.spacing(10) }, // Margin bawah responsif lebih besar
        }}
      >
        {/* <Fade in={true} timeout={800}> */}
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 800, // Mirip font-extrabold
            color: 'text.primary', // Menggunakan warna teks primer dari tema
          }}
        >
          Selamat Datang di CRIT CAT
        </Typography>
        {/* </Fade> */}
        {/* <Fade in={true} timeout={800} style={{ transitionDelay: '200ms' }}> */}
        <Typography
          variant="h5"
          component="p"
          color="text.secondary" // Menggunakan warna teks sekunder dari tema
          paragraph
          sx={{
            maxWidth: '672px', // max-w-2xl
            mx: 'auto', // mx-auto
            mb: theme.spacing(4), // mb-8
          }}
        >
          <strong>CRIT CAT</strong> adalah platform Computerized Adaptive Testing (CAT) inovatif yang dirancang khusus untuk mengukur dan membantu mengembangkan kemampuan berpikir kritis Anda. Melalui soal berbentuk <i>two-tier multiple choice</i>, kami tidak hanya menilai jawaban akhir Anda, tetapi juga kedalaman pemahaman dan kualitas alasan di baliknya.
        </Typography>
        <Box>
          <Link href="/test" passHref>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: theme.spacing(5), // Padding horizontal (mirip px-10 Tailwind)
                py: theme.spacing(1.5), // Padding vertikal (mirip py-3 Tailwind)
                fontSize: '1.125rem', // text-lg
                '&:hover': {
                  transform: 'scale(1.05)',
                },
                transition: theme.transitions.create('transform', {
                  duration: theme.transitions.duration.short,
                }),
              }}
            >
              Mulai Tes
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}