import React, { useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Icon,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { MdAlternateEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { window as Window } from '@neutralinojs/lib'

interface Props {}

const LoginPage: React.FC<Props> = () => {
  useEffect(() => {
    const initialize = async () => {
      await Window.setTitle('Login to IliverCare App')
      await Window.maximize()
    }
    initialize().catch((e) => {
      console.error(e)
    })
  }, [])

  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Box bg="white" px="20" py="16" rounded="3xl">
        <Img src="/icon.png" h="28" mx="auto" mb={10} />
        <Heading color="gray.700" as="h1">
          Welcome To ILiverCare App
        </Heading>
        <Text color="green.600" as="p" fontSize="sm" textAlign="center">
          Empowering Early Detection, Defending Liver Health
        </Text>

        <form>
          <Stack mt="5">
            <FormControl>
              <InputGroup bg="white">
                <InputLeftElement pointerEvents="none">
                  <Icon color="gray.300" as={MdAlternateEmail} />
                </InputLeftElement>
                <Input type="email" placeholder="Email" />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup bg="white">
                <InputLeftElement pointerEvents="none">
                  <Icon color="gray.300" as={RiLockPasswordFill} />
                </InputLeftElement>
                <Input type="password" placeholder="Password" />
              </InputGroup>
            </FormControl>
            <Button size="lg" colorScheme="whatsapp">
              Login
            </Button>
          </Stack>
        </form>

        <Stack columnGap={2} mt="5" textAlign="center">
          <Text fontSize="xl" color="gray.400">
            or
          </Text>
          <Link href="/register" color="blue.600" textTransform="capitalize">
            Create an account
          </Link>
        </Stack>
      </Box>
    </Flex>
  )
}

export default LoginPage
