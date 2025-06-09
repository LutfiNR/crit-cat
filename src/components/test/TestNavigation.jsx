// /src/components/test/TestNavigation.jsx
"use client";

import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TestNavigation = ({
  onPrevious,
  onNext,
  onFinish,
  isFirstQuestion,
  isLastQuestion,
  isNextDisabled,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={onPrevious}
        disabled={isFirstQuestion}
      >
        Sebelumnya
      </Button>
      {isLastQuestion ? (
        <Button
          variant="contained"
          color="success"
          endIcon={<CheckCircleIcon />}
          onClick={onFinish}
          disabled={isNextDisabled} // Bisa jadi tetap perlu menjawab sebelum selesai
        >
          Selesai Tes
        </Button>
      ) : (
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={onNext}
          disabled={isNextDisabled}
        >
          Berikutnya
        </Button>
      )}
    </Box>
  );
};

export default TestNavigation;