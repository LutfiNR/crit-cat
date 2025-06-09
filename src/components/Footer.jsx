"use client";

import React from 'react';
import { Box, Container, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', py: 4, color: 'white' }}>
      <Container maxWidth="lg">
        <Typography align="center" variant="body2">
          &copy; {new Date().getFullYear()} CRIT-CAT. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
