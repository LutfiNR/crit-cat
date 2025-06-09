// /src/app/test/page.jsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Container, CircularProgress, Typography, Box, Button, Alert } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Import Services & Engine
import { validateAccessCode, getTestQuestions, submitTestResults } from '@/lib/api';
import CAT_Engine from '@/lib/catHandlers';

// Import UI Components
import AccessCodeForm from '@/components/test/AccessCodeForm';
import UserInfoForm from '@/components/test/UserInfoForm';
import TestHeader from '@/components/test/TestHeader';
import QuestionDisplay from '@/components/test/QuestionDisplay';
import TierOptions from '@/components/test/TierOptions';
import CompletionScreen from '@/components/test/CompletionScreen';

const TOTAL_TEST_DURATION = 30 * 60; // 30 menit
const INITIAL_THETA = 0; // Theta awal untuk CAT

export default function TestPage() {
  // State untuk mengontrol alur/fase tes
  const [testPhase, setTestPhase] = useState('accessCode'); // accessCode | userInfo | testing | finished | error
  const [errorMessage, setErrorMessage] = useState('');

  // State untuk data
  const [accessCode, setAccessCode] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState(new Set());
  const [userAnswers, setUserAnswers] = useState({ tier1: null, tier2: null });
  const [showTier2, setShowTier2] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TEST_DURATION);
  const [isLoading, setIsLoading] = useState(false);

  // State untuk logika CAT
  const [theta, setTheta] = useState(INITIAL_THETA);
  const [responseHistory, setResponseHistory] = useState([]);
  const [testStartTime, setTestStartTime] = useState(null);
  const [stoppingRule, setStoppingRule] = useState('');

  // --- HANDLER FASE ---
  const handleCodeValidated = async (code) => {
    await validateAccessCode(code); // Throws error on failure
    setAccessCode(code);
    setTestPhase('userInfo');
  };

  const handleUserInfoSubmit = async (info) => {
    setUserInfo(info);
    setTestPhase('testing');
    setTestStartTime(new Date());
  };

  // --- LOGIKA TES ---
  useEffect(() => {
    if (testPhase !== 'testing' || allQuestions.length > 0) return;

    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const questionsData = await getTestQuestions();
        setAllQuestions(questionsData);
        // Pilih soal pertama
        const firstQuestion = questionsData.reduce((prev, curr) =>
          Math.abs(curr.difficulty - 0) < Math.abs(prev.difficulty - 0) ? curr : prev
        );
        setCurrentQuestion(firstQuestion);
        setAnsweredQuestionIds(new Set([firstQuestion.id]));
      } catch (err) {
        setErrorMessage(err.message);
        setTestPhase('error');
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, [testPhase, allQuestions.length]);

  const handleFinishTest = useCallback(async (rule, history) => {
    setStoppingRule(rule);
    setTestPhase('finished');

    const finalData = {
      userInfo: { ...userInfo, accessCode },
      testStartTime,
      testFinishTime: new Date(),
      finalTheta: theta,
      stoppingRule: rule,
      responseHistory: history,
    };
    
    try {
      await submitTestResults(finalData);
    } catch (err) {
      console.error("Gagal menyimpan hasil tes:", err);
      // Mungkin tampilkan notifikasi bahwa penyimpanan gagal tapi tes tetap selesai.
    }
  }, [userInfo, accessCode, testStartTime, theta]);

  // Timer
  useEffect(() => {
    if (testPhase !== 'testing' || timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timerId);
  }, [testPhase, timeLeft]);

  // Cek waktu habis
  useEffect(() => {
    if (timeLeft <= 0 && testPhase === 'testing') {
      handleFinishTest('TIME_WASTED', responseHistory);
    }
  }, [timeLeft, testPhase, responseHistory, handleFinishTest]);

  const processAnswerAndSelectNext = useCallback(() => {
    if (!userAnswers.tier1 || !userAnswers.tier2) return;

    const tier1Correct = userAnswers.tier1 === currentQuestion.correctTier1;
    const tier2Correct = userAnswers.tier2 === currentQuestion.correctTier2;
    
    const score = CAT_Engine.calculateScore(tier1Correct, tier2Correct);
    const oldTheta = theta;
    const responsePattern = CAT_Engine.calculateResponsePattern(score);
    const pCorrect = CAT_Engine.calculateCorrectProbability(oldTheta, currentQuestion.difficulty);
    const pWrong = CAT_Engine.calculcateWrongProbability(pCorrect);
    const newTheta = CAT_Engine.calculateNewTheta(pCorrect, pWrong, responsePattern);
    const informationFunction = CAT_Engine.calculateInformationFunction(pCorrect, pWrong);
    const oldSE = responseHistory.length > 0 ? responseHistory[responseHistory.length - 1].se : 1.0;
    const newSE = CAT_Engine.calculateStandardError(informationFunction);
    const seDifference = responseHistory.length > 0 ? CAT_Engine.calculateDifferenceSE(oldSE, newSE): null;

    const newHistoryEntry = {
      questionId: currentQuestion.id,
      questionDifficulty: currentQuestion.difficulty,
      answerTier1: userAnswers.tier1,
      answerTier2: userAnswers.tier2,
      score,
      pCorrect,
      pWrong,
      responsePattern,
      informationFunction,
      thetaBefore: oldTheta,
      thetaAfter: newTheta,
      se: newSE,
      seDifference,
    };
    const updatedHistory = [...responseHistory, newHistoryEntry];
    
    setResponseHistory(updatedHistory);
    setTheta(newTheta);
    console.log("Response History:", updatedHistory);
    console.log("New Theta:", newTheta);
    console.log("Standard Error:", newSE);
    console.log("SE Difference:", seDifference);
    console.log("Probability of Correct Answer:", pCorrect);
    console.log("Probability of Wrong Answer:", pWrong);


    if (answeredQuestionIds.size + 1 >= allQuestions.length) {
      handleFinishTest('NO_MORE_QUESTIONS', updatedHistory);
      return;
    }
    if (seDifference !== null && seDifference <= 0.3) {
      handleFinishTest('SE_DIFFERENCE', updatedHistory);
      return;
    }

    const availableQuestions = allQuestions.filter(q => !answeredQuestionIds.has(q.id) && q.id !== currentQuestion.id);
    let nextQuestion;
    const targetDifficulty = newTheta; // Target ideal adalah theta saat ini

    if (score < 3) { // Cari soal lebih mudah
      const easierQuestions = availableQuestions.filter(q => q.difficulty < 0);
      nextQuestion = easierQuestions.length > 0
        ? easierQuestions.reduce((prev, curr) => Math.abs(curr.difficulty - targetDifficulty) < Math.abs(prev.difficulty - targetDifficulty) ? curr : prev)
        : availableQuestions.sort((a, b) => b.difficulty - a.difficulty)[0]; 
        console.log(easierQuestions);
        // Fallback ke paling sulit dari sisa
    } else { // Cari soal lebih sulit
      const harderQuestions = availableQuestions.filter(q => q.difficulty > 0);
      nextQuestion = harderQuestions.length > 0
        ? harderQuestions.reduce((prev, curr) => Math.abs(curr.difficulty - targetDifficulty) < Math.abs(prev.difficulty - targetDifficulty) ? curr : prev)
        : availableQuestions.sort((a, b) => a.difficulty - b.difficulty)[0]; // Fallback ke paling mudah dari sisa
        console.log(harderQuestions);
    }

    setCurrentQuestion(nextQuestion);
    setAnsweredQuestionIds(prev => new Set(prev).add(nextQuestion.id));
    setUserAnswers({ tier1: null, tier2: null });
    setShowTier2(false);
  }, [userAnswers, currentQuestion, theta, responseHistory, allQuestions, answeredQuestionIds, handleFinishTest]);

  // --- RENDER LOGIC ---
  const renderContent = () => {
    switch (testPhase) {
      case 'accessCode':
        return <AccessCodeForm onCodeValidated={handleCodeValidated} />;
      case 'userInfo':
        return <UserInfoForm onStartTest={handleUserInfoSubmit} />;
      case 'testing':
        if (isLoading) {
          return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}><CircularProgress /></Box>;
        }
        if (!currentQuestion) {
          return <Alert severity="warning">Tidak dapat memuat soal. Silakan coba lagi.</Alert>;
        }
        return (
          <>
            <TestHeader
              timeLeft={timeLeft}
              userName={userInfo.name}
              userClass={userInfo.studentClass}
              userId={userInfo.studentId}
            />
            <QuestionDisplay
              currentQuestionIndex={currentQuestion.id}
              image={currentQuestion.image}
              tier1Text={currentQuestion.tier1Text}
              tier2Text={currentQuestion.tier2Text}
              showTier2={showTier2}
            />
            <TierOptions
              label="Pilih Jawaban:"
              options={currentQuestion.tier1Options}
              selectedValue={userAnswers.tier1}
              onChange={(e) => {
                setUserAnswers(prev => ({ ...prev, tier1: e.target.value }));
                setShowTier2(true);
              }}
            />
            {showTier2 && (
              <Box sx={{ mt: 3 }}>
                <TierOptions
                  label="Pilih Alasan:"
                  options={currentQuestion.tier2Options}
                  selectedValue={userAnswers.tier2}
                  onChange={(e) => setUserAnswers(prev => ({ ...prev, tier2: e.target.value }))}
                />
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={processAnswerAndSelectNext}
                disabled={!userAnswers.tier1 || !userAnswers.tier2}
              >
                Lanjut
              </Button>
            </Box>
          </>
        );
      case 'finished':
        return <CompletionScreen userName={userInfo.name} stoppingRule={stoppingRule} />;
      case 'error':
        return <Alert severity="error">{errorMessage}</Alert>;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {renderContent()}
    </Container>
  );
}