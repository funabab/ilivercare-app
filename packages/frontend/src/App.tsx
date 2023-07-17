import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Text fontSize="3xl">It Worked!</Text>
    </Flex>
  )
}

export default App
