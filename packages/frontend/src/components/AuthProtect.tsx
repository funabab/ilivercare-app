import React, { useEffect } from 'react'
import { Bars } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '../firebase'

interface Props {}

const AuthProtect: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const [user, isLoading] = useAuthState(firebaseAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (!user) {
      navigate('/')
    }
  }, [user, isLoading, navigate])

  if (isLoading) {
    return (
      <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </Flex>
    )
  }

  return children
}

export default AuthProtect
