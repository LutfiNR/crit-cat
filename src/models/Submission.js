import mongoose from 'mongoose';

const ResponseHistorySchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  questionDifficulty: { type: Number, required: true },
  answerTier1: { type: String, required: true },
  answerTier2: { type: String, required: true },
  score: { type: Number, required: true },
  pCorrect: { type: Number, required: true },
  pWrong: { type: Number, required: true },
  responsePattern: { type: Number, required: true },
  informationFunction: { type: Number, required: true },
  thetaBefore: { type: Number, required: true },
  thetaAfter: { type: Number, required: true },
  se: { type: Number, required: true },
  seDifference: { type: Number, default: null },
}, { _id: false, timestamps: { createdAt: true, updatedAt: false } });

const SubmissionSchema = new mongoose.Schema({
  userInfo: {
    name: { type: String, required: true },
    studentClass: { type: String, required: true },
    studentId: { type: String, required: true },
    accessCode: { type: String, required: true },
  },
  testStartTime: { type: Date, required: true },
  testFinishTime: { type: Date, required: true },
  finalTheta: { type: Number, required: true },
  stoppingRule: { type: String, enum: ['TIME_WASTED', 'NO_MORE_QUESTIONS', 'SE_DIFFERENCE'], required: true },
  responseHistory: [ResponseHistorySchema],
}, { timestamps: true });

export default mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);