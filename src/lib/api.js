export const validateAccessCode = async (accessCode) => {
  const response = await fetch('/api/validate-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessCode }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Gagal validasi kode.');
  return data;
};

export const getTestQuestions = async () => {
  const response = await fetch('/api/questions');
  if (!response.ok) throw new Error('Gagal mengambil data soal.');
  const data = await response.json();
  return data.questions;
};

export const postTestQuestions = async (questions) => {
  const response = await fetch('/api/questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questions),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Gagal menyimpan soal.');
  return data;
};

export const submitTestResults = async (submissionData) => {
  const response = await fetch('/api/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submissionData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Gagal menyimpan hasil tes.');
  return data;
};