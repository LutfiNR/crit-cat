// /src/app/api/admin/submissions/[id]/route.js

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Submission from '@/models/Submission';

// Signature fungsi diubah sedikit untuk kejelasan
export async function GET(request, context) {
  // Ambil 'id' dari context.params
  const { id } = await context.params;

  await dbConnect();

  try {
    // Validasi apakah 'id' adalah ObjectId yang valid (praktik yang baik)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return NextResponse.json({ success: false, message: 'ID Submission tidak valid.' }, { status: 400 });
    }

    const submission = await Submission.findById(id);

    if (!submission) {
      return NextResponse.json({ success: false, message: 'Submission tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: submission });
    
  } catch (error) {
    console.error(`Error fetching submission with id ${id}:`, error);
    return NextResponse.json({ success: false, message: 'Gagal mengambil data.' }, { status: 500 });
  }
}