// /src/app/api/questions/count/route.js

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Question from '@/models/Question';

export async function GET() {
  await dbConnect();

  try {
    // Gunakan countDocuments() untuk efisiensi
    const count = await Question.countDocuments({});
    
    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error('Error counting questions:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menghitung soal.' },
      { status: 500 }
    );
  }
}