'use client';

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { TEXTS } from '../lib/mock';
import { COLORS } from '../theme';

export function Banners() {
  return (
    <Container maxWidth={false} sx={{ px: { xs: 1, sm: 2 } }}>
      {/* Main Title Banner */}
      <Box
        sx={{
          bgcolor: COLORS.bannerGreen,
          borderRadius: 2,
          py: { xs: 2, md: 3 },
          px: { xs: 2, md: 4 },
          mb: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          sx={{
            color: 'text.primary',
            fontWeight: 700,
            fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' },
          }}
        >
          {TEXTS.banners.main_title}
        </Typography>
      </Box>

      {/* Subtitle Banner */}
      <Box
        sx={{
          bgcolor: 'secondary.main',
          borderRadius: 2,
          py: { xs: 1.5, md: 2 },
          px: { xs: 2, md: 4 },
          mb: { xs: 3, md: 4 },
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
          }}
        >
          {TEXTS.banners.subtitle}
        </Typography>
      </Box>
    </Container>
  );
}