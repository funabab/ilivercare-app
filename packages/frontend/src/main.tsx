import React from 'react'
import '@/styles/global.css'
import ReactDOM from 'react-dom/client'
import { ChakraBaseProvider } from '@chakra-ui/react'
import { theme } from './chakra/theme.ts'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/login/index.tsx'
import RegisterPage from './pages/register/index.tsx'
import VerifyEmailPage from './pages/verify-email/index.tsx'
import DashboardHomePage from './pages/dashboard/index.tsx'
import DashboardRecordPage from './pages/dashboard/record/index.tsx'
import DashboardLayout from './layouts/DashboardLayout.tsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/verify-email',
    element: <VerifyEmailPage />,
  },
  {
    path: '/dashboard',
    element: (
      <DashboardLayout>
        <DashboardHomePage />
      </DashboardLayout>
    ),
  },
  {
    path: '/dashboard/record/:recordId',
    element: (
      <DashboardLayout>
        <DashboardRecordPage />
      </DashboardLayout>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraBaseProvider theme={theme}>
      <RouterProvider router={routes} />
    </ChakraBaseProvider>
  </React.StrictMode>
)
