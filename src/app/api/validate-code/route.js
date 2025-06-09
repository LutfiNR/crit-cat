import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { accessCode } = await request.json();
    if (accessCode === process.env.ACCESS_TOKEN_SECRET) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'Kode akses tidak valid.' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Terjadi kesalahan server.' }, { status: 500 });
  }
}