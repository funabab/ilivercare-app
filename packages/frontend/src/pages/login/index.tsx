import React, { useCallback, useEffect, useState } from 'react'
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
  InputRightElement,
  Link,
  Stack,
  Text,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import { MdAlternateEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { window as Window } from '@neutralinojs/lib'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Controller, useForm } from 'react-hook-form'
import { LoginBody, loginBodySchema } from '../../schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { errors, firebaseAuth } from '../../firebase'
import { useNavigate } from 'react-router-dom'

interface Props {}

const LoginPage: React.FC<Props> = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClick = useCallback(() => {
    setShowPassword((state) => !state)
  }, [])
  const toast = useToast({
    position: 'top-right',
  })
  const navigate = useNavigate()

  const [login, _user, isLoading, error] =
    useSignInWithEmailAndPassword(firebaseAuth)

  const { control, handleSubmit } = useForm<LoginBody>({
    resolver: zodResolver(loginBodySchema),
  })

  useEffect(() => {
    if (error) {
      if (error.message.indexOf('auth/email-not-verified') !== -1) {
        toast({
          title: 'Error',
          description: 'Email not verified',
          status: 'error',
        })
        navigate('/verify-email')
        return
      }

      toast({
        title: 'Error',
        description: errors[error.code],
        status: 'error',
      })
    }
  }, [error, toast, navigate])

  useEffect(() => {
    const initialize = async () => {
      await Window.setTitle('Login to IliverCare App')
      await Window.maximize()
    }

    initialize().catch((e) => {
      console.error(e)
    })
  }, [])

  const onSubmit = handleSubmit((data) => {
    login(data.email, data.password)
      .then((response) => {
        if (response) {
          navigate('/dashboard')
        }
      })
      .catch((e) => {
        console.error(e)
      })
  })

  return (
    <Flex w="100vw" h="100vh" justifyContent="center" alignItems="center">
      <Box
        bg="white"
        px={{ base: 16, '2xl': 20 }}
        py={{ base: 10, '2xl': 16 }}
        rounded="xl"
      >
        <Img
          src="/icon.png"
          h={{ base: 20, '2xl': 28 }}
          mx="auto"
          mb={{ base: 5, '2xl': 10 }}
        />
        <Heading
          color="gray.700"
          fontSize={{ base: '2xl', '2xl': 'unset' }}
          textAlign="center"
          as="h1"
        >
          Welcome To ILiverCare App
        </Heading>
        <Text
          color="green.600"
          as="p"
          fontSize={{ base: 'xs', '2xl': 'sm' }}
          textAlign="center"
        >
          Empowering Early Detection, Defending Liver Health
        </Text>

        <form onSubmit={onSubmit}>
          <Stack mt="5" spacing="4">
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, name, onBlur }, fieldState }) => (
                <FormControl isInvalid={fieldState.invalid}>
                  <InputGroup bg="white">
                    <InputLeftElement pointerEvents="none" h="full">
                      <Icon color="gray.300" as={MdAlternateEmail} my="auto" />
                    </InputLeftElement>
                    <Input
                      type="email"
                      placeholder="Email"
                      size="lg"
                      onBlur={onBlur}
                      onChange={(e) => onChange(e.target.value)}
                      name={name}
                    />
                  </InputGroup>
                  {fieldState.error?.message && (
                    <FormErrorMessage>
                      {fieldState.error.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { name, onBlur, onChange }, fieldState }) => (
                <FormControl isInvalid={fieldState.invalid}>
                  <InputGroup bg="white">
                    <InputLeftElement pointerEvents="none" h="full">
                      <Icon
                        color="gray.300"
                        as={RiLockPasswordFill}
                        my="auto"
                      />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      size="lg"
                      onBlur={onBlur}
                      name={name}
                      onChange={(e) => onChange(e.target.value)}
                    />
                    <InputRightElement h="full">
                      <Button
                        variant="link"
                        tabIndex={-1}
                        size="lg"
                        my="auto"
                        onClick={handleClick}
                      >
                        {showPassword ? (
                          <Icon as={AiFillEyeInvisible} />
                        ) : (
                          <Icon as={AiFillEye} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {fieldState.error?.message && (
                    <FormErrorMessage>
                      {fieldState.error.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              )}
            />

            <Button
              size="lg"
              colorScheme="whatsapp"
              type="submit"
              isLoading={isLoading}
            >
              Login
            </Button>
          </Stack>
        </form>

        <Stack columnGap={2} mt="5" textAlign="center">
          <Text fontSize="xl" color="gray.400">
            or
          </Text>
          <Link
            href="/register"
            color="blue.600"
            textTransform="capitalize"
            fontWeight="semibold"
          >
            Create an account
          </Link>
        </Stack>
      </Box>
    </Flex>
  )
}

export default LoginPage
