import React from 'react'
import ReactDOM from 'react-dom/client'
import { init } from '@neutralinojs/lib'
import { ChakraBaseProvider } from '@chakra-ui/react'
import { theme } from './chakra/theme.ts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/login/index.tsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={routes} />
    </ChakraBaseProvider>
  </React.StrictMode>
)

init()
