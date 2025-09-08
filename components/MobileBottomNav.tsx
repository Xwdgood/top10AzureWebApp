'use client';

import React, { useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  useTheme,
  useMediaQuery,
  Box,
} from '@mui/material';
import {
  Home,
  LibraryBooks,
  Groups,
  Campaign,
} from '@mui/icons-material';
import { TEXTS } from '../lib/mock';

export function MobileBottomNav() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState(0);

  if (!isMobile) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        sx={{
          bgcolor: 'primary.main',
          '& .MuiBottomNavigationAction-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            '&.Mui-selected': {
              color: 'white',
            },
          },
          '& .MuiBottomNavigationAction-label': {
            fontSize: '0.75rem',
            '&.Mui-selected': {
              fontSize: '0.75rem',
            },
          },
        }}
      >
        <BottomNavigationAction
          label={TEXTS.navigation.home}
          icon={<Home />}
          aria-label={TEXTS.navigation.home}
        />
        <BottomNavigationAction
          label={TEXTS.navigation.reports}
          icon={<LibraryBooks />}
          aria-label={TEXTS.navigation.reports}
        />
        <BottomNavigationAction
          label={TEXTS.navigation.teams}
          icon={<Groups />}
          aria-label={TEXTS.navigation.teams}
        />
        <BottomNavigationAction
          label={TEXTS.navigation.campaigns}
          icon={<Campaign />}
          aria-label={TEXTS.navigation.campaigns}
        />
      </BottomNavigation>
    </Box>
  );
}