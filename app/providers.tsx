'use client'

import { ReactNode } from 'react'

import { NextUIProvider } from '@nextui-org/system'

import { LocalizationProvider } from '@mui/x-date-pickers'
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </NextUIProvider>
  )
}
