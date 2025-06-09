// /src/app/api/questions/[id]/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Question from '@/models/Question';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// MENGAMBIL SATU SOAL BERDASARKAN ID (untuk form edit)
export async function GET(request,  context ) {
  const { id } = await context.params;
  await dbConnect();
  try {
    const question = await Question.findById(id);
    if (!question) {
      return NextResponse.json({ success: false, message: 'Soal tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: question });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal mengambil data.' }, { status: 500 });
  }
}

// MENGEDIT SOAL BERDASARKAN ID
export async function PUT(request, context) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Akses ditolak.' }, { status: 403 });
  }

  const { id } = await context.params;
  await dbConnect();
  try {
    const questionData = await request.json();
    const updatedQuestion = await Question.findByIdAndUpdate(id, questionData, {
      new: true,
      runValidators: true,
    });
    if (!updatedQuestion) {
      return NextResponse.json({ success: false, message: 'Soal tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedQuestion });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal memperbarui soal.', error: error.message }, { status: 400 });
  }
}

// MENGHAPUS SOAL BERDASARKAN ID
export async function DELETE(request, context) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ message: 'Akses ditolak.' }, { status: 403 });
  }

  const { id } = await context.params;
  await dbConnect();
  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);
    if (!deletedQuestion) {
      return NextResponse.json({ success: false, message: 'Soal tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Soal berhasil dihapus.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal menghapus soal.' }, { status: 500 });
  }
}