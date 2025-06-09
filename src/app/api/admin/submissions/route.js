// /src/app/api/admin/submissions/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Submission from '@/models/Submission';

export async function GET() {
  await dbConnect();
  try {
    const submissions = await Submission.find({})
      .select('userInfo.name finalTheta stoppingRule createdAt') // Hanya ambil data ringkasan
      .sort({ createdAt: -1 }); // Urutkan dari yang terbaru

    return NextResponse.json({ success: true, data: submissions });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Gagal mengambil data submission.' }, { status: 500 });
  }
}