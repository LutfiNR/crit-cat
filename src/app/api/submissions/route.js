import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Submission from '@/models/Submission';

export async function POST(request) {
  await dbConnect();
  try {
    const submissionData = await request.json();
    const newSubmission = new Submission(submissionData);
    await newSubmission.save();
    return NextResponse.json({ success: true, submissionId: newSubmission._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}