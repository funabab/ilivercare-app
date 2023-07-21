import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '../firebase'
import { LoaderScreen } from './Loader'
import { Flex } from '@chakra-ui/react'

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
    return (
      <Flex w="100vw" h="100vh" position="relative">
        <LoaderScreen />
      </Flex>
    )
  }

  return children
}

export default AuthProtect
