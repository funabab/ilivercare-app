import React from 'react'
import { Box } from '@chakra-ui/react'
import AuthProtect from '../../components/AuthProtect'
import Header from '../../components/Header'

interface Props {}

const DashboardHomePage: React.FC<Props> = () => {
  return (
    <AuthProtect>
      <Box w="100vw" h="100vh">
        <Header />
      </Box>
    </AuthProtect>
  )
}

export default DashboardHomePage
