import React, { useEffect } from 'react'
import { firebaseAuth } from '@/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { LoaderScreen } from './Loader'
import { useNavigate } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'

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
    return (
      <Flex w="100vw" h="100vh" position="relative">
        <LoaderScreen />
      </Flex>
    )
  }

  return children
}

export default AuthRedirect
