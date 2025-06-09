// /src/app/admin/layout.jsx
"use client";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { CircularProgress, Box } from '@mui/material';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (status === "unauthenticated" || session?.user?.role !== 'admin') {
    redirect('/login');
  }

  // Jika sudah login sebagai admin, tampilkan children (halaman admin)
  return <>{children}</>;
}