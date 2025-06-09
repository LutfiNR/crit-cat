// /src/app/about/page.jsx

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// Ikon-ikon yang mungkin relevan
import SchoolIcon from '@mui/icons-material/School'; // Untuk target audiens (siswa)
import WorkIcon from '@mui/icons-material/Work'; // Untuk profesional
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Untuk ide, inovasi, berpikir kritis
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Untuk fitur
import ExtensionIcon from '@mui/icons-material/Extension'; // Untuk Two-Tier
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Untuk CAT / Pengembangan
import AnalyticsIcon from '@mui/icons-material/Analytics'; // Untuk laporan hasil

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          textAlign="center"
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          Tentang CRIT CAT
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
            Apa Itu CRIT CAT?
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>CRIT CAT</strong> adalah sebuah platform Computerized Adaptive Testing (CAT) yang dirancang secara cermat untuk mengevaluasi kemampuan berpikir kritis. Berbeda dari tes konvensional, CRIT CAT menggunakan pendekatan soal <i>two-tier multiple choice</i>. Ini berarti setiap soal terdiri dari dua tingkatan: tingkatan pertama adalah pertanyaan utama, dan tingkatan kedua meminta Anda untuk memberikan alasan atau justifikasi atas jawaban yang Anda pilih di tingkatan pertama.
          </Typography>
          <Typography variant="body1" paragraph>
            Sifat adaptif dari tes ini memastikan bahwa tingkat kesulitan soal akan disesuaikan secara dinamis berdasarkan performa Anda, sehingga memberikan pengukuran yang lebih akurat dan pengalaman tes yang lebih personal dan menantang.
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
            Mengapa Berpikir Kritis Itu Penting?
          </Typography>
          <Typography variant="body1" paragraph>
            Berpikir kritis adalah kemampuan untuk menganalisis informasi secara objektif, mengidentifikasi asumsi, mengevaluasi argumen, menarik kesimpulan yang logis, dan memecahkan masalah secara efektif. Keterampilan ini sangat vital dalam:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <LightbulbIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Pengambilan keputusan yang lebih baik dalam kehidupan sehari-hari." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LightbulbIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Pemecahan masalah yang kompleks di lingkungan akademik maupun profesional." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LightbulbIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Inovasi dan kreativitas dengan melihat masalah dari berbagai perspektif." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LightbulbIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Membedakan antara informasi yang valid dan misinformasi di era digital." />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
            Fitur Utama CRIT CAT
          </Typography>
          <Grid container spacing={2}>
            {[
              { icon: <TrendingUpIcon />, text: "Tes Adaptif (CAT): Soal disesuaikan secara dinamis dengan kemampuan Anda." },
              { icon: <ExtensionIcon />, text: "Soal Two-Tier: Mengukur jawaban dan pemahaman alasan di baliknya." },
              { icon: <CheckCircleOutlineIcon />, text: "Fokus pada Aspek Kritis: Dirancang untuk menilai berbagai sub-keterampilan berpikir kritis." },
              { icon: <AnalyticsIcon />, text: "Laporan Hasil (untuk Admin): Menyediakan data pengerjaan tes untuk dianalisis lebih lanjut oleh administrator." }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {React.cloneElement(item.icon, { color: "action" })}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
            Untuk Siapa Platform Ini?
          </Typography>
          <Typography variant="body1" paragraph>
            CRIT CAT dirancang untuk berbagai kalangan yang ingin mengukur dan meningkatkan kemampuan berpikir kritis mereka, termasuk:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <SchoolIcon color="action" />
              </ListItemIcon>
              <ListItemText primary="Siswa dan Mahasiswa: Sebagai alat bantu untuk mengasah kemampuan analisis dan persiapan menghadapi tantangan akademik." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <WorkIcon color="action" />
              </ListItemIcon>
              <ListItemText primary="Profesional: Untuk meningkatkan kemampuan pemecahan masalah dan pengambilan keputusan strategis dalam karir." />
            </ListItem>
             <ListItem>
              <ListItemIcon>
                <LightbulbIcon color="action" />
              </ListItemIcon>
              <ListItemText primary="Individu Pembelajar Mandiri: Siapa saja yang tertarik untuk memahami dan mengembangkan potensi berpikir kritisnya." />
            </ListItem>
             <ListItem>
              <ListItemIcon>
                <SchoolIcon color="action" /> {/* Bisa diganti ikon lain untuk institusi */}
              </ListItemIcon>
              <ListItemText primary="Institusi Pendidikan & Pelatihan: Sebagai alat evaluasi dan pengembangan keterampilan berpikir kritis dalam skala yang lebih besar (melalui fitur admin)." />
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Container>
  );
}