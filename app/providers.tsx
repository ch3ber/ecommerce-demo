'use client'

import { ReactNode } from 'react'

import { NextUIProvider } from '@nextui-org/system'

import { LocalizationProvider } from '@mui/x-date-pickers'
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export function Providers({ children }: { children: ReactNode }) {

  // create theme for MUI
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <NextUIProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </LocalizationProvider>
    </NextUIProvider>
  )
}
