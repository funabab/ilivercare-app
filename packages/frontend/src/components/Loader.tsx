import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Dna } from 'react-loader-spinner'

interface Props {}

const Loader: React.FC<Props> = () => {
  return (
    <Dna
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  )
}

export const LoaderScreen: React.FC<Props> = () => {
  return (
    <Flex w="full" h="full" alignItems="center" justifyContent="center">
      <Loader />
    </Flex>
  )
}

export default Loader
