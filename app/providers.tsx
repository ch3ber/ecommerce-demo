// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/system'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}
