import { extendTheme } from '@chakra-ui/react'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

export const theme = extendTheme({
  colors: {
    brand: '#8494af',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.100',
      },
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
})
