"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Paper, Typography, IconButton, Divider, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function QuestionForm({ initialData = null }) {
  const router = useRouter();
  const isEditing = !!initialData;

  // State utama untuk data form, kecuali ID soal baru
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    image: initialData?.image || '',
    tier1Text: initialData?.tier1Text || '',
    tier1Options: initialData?.tier1Options && initialData.tier1Options.length > 0 ? initialData.tier1Options : [{ id: '', text: '' }],
    tier2Text: initialData?.tier2Text || '',
    tier2Options: initialData?.tier2Options && initialData.tier2Options.length > 0 ? initialData.tier2Options : [{ id: '', text: '' }],
    correctTier1: initialData?.correctTier1 || '',
    correctTier2: initialData?.correctTier2 || '',
    difficulty: initialData?.difficulty || 0,
  });

  // State terpisah untuk ID, agar bisa di-generate secara otomatis
  const [generatedId, setGeneratedId] = useState(initialData?.id || '');
  const [isLoadingId, setIsLoadingId] = useState(!isEditing);

  // useEffect ini hanya berjalan saat mode "Tambah Soal Baru"
  useEffect(() => {
    if (!isEditing) {
      const fetchQuestionCount = async () => {
        try {
          const res = await fetch('/api/questions/count');
          const data = await res.json();
          if (data.success) {
            setGeneratedId(`q${data.count + 1}`);
          } else {
            setGeneratedId('Error! Refresh');
          }
        } catch (error) {
          console.error("Gagal mengambil jumlah soal:", error);
          setGeneratedId('Error!');
        } finally {
          setIsLoadingId(false);
        }
      };
      fetchQuestionCount();
    }
  }, [isEditing]);

  // Handler untuk input standar
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler untuk perubahan pada field opsi (Tier 1 & Tier 2)
  const handleOptionChange = (tier, index, field, value) => {
    const optionsKey = tier === 1 ? 'tier1Options' : 'tier2Options';
    const newOptions = [...formData[optionsKey]];
    newOptions[index][field] = value;
    setFormData(prev => ({ ...prev, [optionsKey]: newOptions }));
  };

  // Handler untuk menambah baris opsi baru
  const addOption = (tier) => {
    const optionsKey = tier === 1 ? 'tier1Options' : 'tier2Options';
    setFormData(prev => ({
      ...prev,
      [optionsKey]: [...prev[optionsKey], { id: '', text: '' }]
    }));
  };

  // Handler untuk menghapus baris opsi
  const removeOption = (tier, index) => {
    const optionsKey = tier === 1 ? 'tier1Options' : 'tier2Options';
    if (formData[optionsKey].length <= 1) return; // Mencegah menghapus opsi terakhir
    const newOptions = formData[optionsKey].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [optionsKey]: newOptions }));
  };
  
  // Handler untuk submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Gabungkan ID yang di-generate dengan sisa data form menjadi payload
    const payload = {
      ...formData,
      id: generatedId,
    };

    const url = isEditing ? `/api/questions/${initialData._id}` : '/api/questions';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        alert(isEditing ? 'Soal berhasil diperbarui!' : 'Soal berhasil ditambahkan!');
        router.push('/admin/question/bank');
        router.refresh(); // Memuat ulang data di halaman bank soal
      } else {
        alert('Gagal: ' + (data.message || 'Error tidak diketahui'));
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Terjadi error pada sisi client.');
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, md: 3 }, mt: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

        <Typography variant="h6">Data Umum Soal</Typography>
        <TextField 
          name="id" 
          label="ID Soal (Otomatis)" 
          value={isLoadingId ? "Memuat..." : generatedId}
          fullWidth 
          disabled // Input field ini sekarang non-aktif
          InputProps={{
            startAdornment: isLoadingId ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null,
          }}
          variant="filled" // Beri style berbeda agar jelas ini non-aktif
        />
        <TextField name="difficulty" label="Tingkat Kesulitan (b)" type="number" inputProps={{ step: "0.01" }} value={formData.difficulty} onChange={handleChange} fullWidth required />
        <TextField name="image" label="URL Gambar (Opsional)" value={formData.image} onChange={handleChange} fullWidth />
        
        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Tier 1</Typography>
        <TextField name="tier1Text" label="Teks Soal Tier 1" multiline rows={4} value={formData.tier1Text} onChange={handleChange} fullWidth required />
        
        <Typography variant="subtitle1" sx={{ mt: 2 }}>Opsi Jawaban Tier 1</Typography>
        {formData.tier1Options.map((opt, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <TextField label={`ID Opsi ${index + 1}`} value={opt.id} onChange={(e) => handleOptionChange(1, index, 'id', e.target.value)} required sx={{ width: '30%' }} />
            <TextField label={`Teks Opsi ${index + 1}`} value={opt.text} onChange={(e) => handleOptionChange(1, index, 'text', e.target.value)} required fullWidth />
            <IconButton onClick={() => removeOption(1, index)} color="error" disabled={formData.tier1Options.length <= 1}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddCircleOutlineIcon />} onClick={() => addOption(1)}>Tambah Opsi Tier 1</Button>
        <TextField name="correctTier1" label="ID Jawaban Benar Tier 1" value={formData.correctTier1} onChange={handleChange} fullWidth required sx={{ mt: 2 }} />

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6">Tier 2</Typography>
        <TextField name="tier2Text" label="Teks Soal Tier 2 (Alasan)" multiline rows={2} value={formData.tier2Text} onChange={handleChange} fullWidth required />

        <Typography variant="subtitle1" sx={{ mt: 2 }}>Opsi Alasan Tier 2</Typography>
        {formData.tier2Options.map((opt, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <TextField label={`ID Alasan ${index + 1}`} value={opt.id} onChange={(e) => handleOptionChange(2, index, 'id', e.target.value)} required sx={{ width: '30%' }} />
            <TextField label={`Teks Alasan ${index + 1}`} value={opt.text} onChange={(e) => handleOptionChange(2, index, 'text', e.target.value)} required fullWidth />
            <IconButton onClick={() => removeOption(2, index)} color="error" disabled={formData.tier2Options.length <= 1}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button startIcon={<AddCircleOutlineIcon />} onClick={() => addOption(2)}>Tambah Opsi Tier 2</Button>
        <TextField name="correctTier2" label="ID Alasan Benar Tier 2" value={formData.correctTier2} onChange={handleChange} fullWidth required sx={{ mt: 2 }} />
        
        <Box mt={3}>
            <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoadingId}>
                {isEditing ? 'Perbarui Soal' : 'Simpan Soal Baru'}
            </Button>
        </Box>
      </Box>
    </Paper>
  );
}