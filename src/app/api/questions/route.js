import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Question from '@/models/Question';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  await dbConnect();
  try {
    const questions = await Question.find({});
    if (!questions || questions.length === 0) {
      return NextResponse.json({ success: false, message: 'Soal tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ success: false, message: 'Gagal mengambil soal.' }, { status: 500 });
  }
}

// --- FUNGSI POST (DIPERBARUI DENGAN PROTEKSI) ---
export async function POST(request) {
  // 1. CEK SESI LOGIN ADMIN
  const session = await getServerSession(authOptions);

  // Jika tidak ada sesi ATAU peran pengguna bukan 'admin'
  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json(
      { success: false, message: 'Akses ditolak. Anda harus login sebagai admin.' },
      { status: 403 } // 403 Forbidden
    );
  }

  // --- Jika pengecekan berhasil, lanjutkan logika asli ---
  await dbConnect();

  try {
    const questionData = await request.json();
    const existingQuestion = await Question.findOne({ id: questionData.id });
    if (existingQuestion) {
      // Jika soal dengan ID tersebut sudah ada, kirim error 409 Conflict
      return NextResponse.json(
        { success: false, message: `Soal dengan ID "${questionData.id}" sudah ada.` },
        { status: 409 }
      );
    }
    const newQuestion = new Question(questionData);
    await newQuestion.save();

    return NextResponse.json(
      { success: true, message: 'Soal berhasil ditambahkan.', data: newQuestion },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating question:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, message: 'Data yang dikirim tidak valid.', errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Gagal menambahkan soal ke database.' },
      { status: 500 }
    );
  }
}