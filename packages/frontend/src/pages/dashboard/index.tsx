import React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import AuthProtect from '../../components/AuthProtect'

interface Props {}

const DashboardHomePage: React.FC<Props> = () => {
  return (
    <AuthProtect>
      <Flex justifyContent="center" alignItems="center">
        <Heading>Dashboard</Heading>
      </Flex>
    </AuthProtect>
  )
}

export default DashboardHomePage
