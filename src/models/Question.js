import mongoose from 'mongoose';

const OptionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
});

const QuestionSchema = new mongoose.Schema({
  id: { type: String, required: true, index: true },
  image: { type: String, default: null }, // URL gambar soal
  difficulty: { type: Number, required: true }, // Nilai-b
  tier1Text: { type: String, required: true },
  tier1Options: [OptionSchema],
  tier2Text: { type: String, required: true },
  tier2Options: [OptionSchema],
  correctTier1: { type: String, required: true },
  correctTier2: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);