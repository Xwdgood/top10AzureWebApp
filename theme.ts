'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2C4E71',
    },
    secondary: {
      main: '#FBF26E',
    },
    success: {
      main: '#22C55E',
    },
    error: {
      main: '#EF4444',
    },
    info: {
      main: '#D4E4F2',
    },
    text: {
      primary: '#1F2A37',
      secondary: '#6B7280',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: '"Inter", "Montserrat", system-ui, -apple-system, sans-serif',
    h1: {
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 700,
    },
    h2: {
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 700,
    },
    h3: {
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 700,
    },
    h4: {
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 700,
    },
    h5: {
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 600,
    },
    h6: {
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 600,
    },
    body1: {
      fontVariantNumeric: 'tabular-nums',
    },
    body2: {
      fontVariantNumeric: 'tabular-nums',
    },
    subtitle1: {
      fontVariantNumeric: 'tabular-nums',
    },
    subtitle2: {
      fontVariantNumeric: 'tabular-nums',
    },
    button: {
      fontVariantNumeric: 'tabular-nums',
    },
    caption: {
      fontVariantNumeric: 'tabular-nums',
    },
    overline: {
      fontVariantNumeric: 'tabular-nums',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          elevation: 2,
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          elevation: 4,
        },
      },
    },
  },
});

// 额外颜色常量
export const COLORS = {
  bannerGreen: '#B7CD7A',
  lightGrey: '#9CA3AF',
} as const;