import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '../firebase'
import { LoaderScreen } from './Loader'

interface Props {
  redirectTo?: string
}

const AuthProtect: React.FC<React.PropsWithChildren<Props>> = ({
  redirectTo = '/',
  children,
}) => {
  const [user, isLoading] = useAuthState(firebaseAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !user) {
      navigate(redirectTo)
    }
  }, [user, isLoading, navigate, redirectTo])

  if (isLoading) {
    return <LoaderScreen />
  }

  return children
}

export default AuthProtect
