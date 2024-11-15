import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import React from 'react'

const ThemProvider = ({children, ...props} : ThemeProviderProps) => {
  return (
   <NextThemeProvider {...props} >{children}</NextThemeProvider>
  )
}

export default ThemProvider