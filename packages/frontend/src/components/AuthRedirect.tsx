import React, { useEffect } from 'react'
import { firebaseAuth } from '@/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { LoaderScreen } from './Loader'
import { useNavigate } from 'react-router-dom'

interface Props {
  redirectTo?: string
}

const AuthRedirect: React.FC<React.PropsWithChildren<Props>> = ({
  redirectTo = '/dashboard',
  children,
}) => {
  const [user, isLoading] = useAuthState(firebaseAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate(redirectTo)
    }
  }, [user, navigate, redirectTo])

  console.log({ user, isLoading })

  if (isLoading) {
    return <LoaderScreen />
  }

  return children
}

export default AuthRedirect
