import React, { useCallback, useState, useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Text,
  Select,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import { MdAlternateEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { BiSolidUser } from 'react-icons/bi'
import { Controller, useForm } from 'react-hook-form'
import { RegisterBody, regsiterBodySchema } from '../../schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHttpsCallable } from 'react-firebase-hooks/functions'
import { firebaseFunctions } from '../../firebase'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { window as Window } from '@tauri-apps/api'

interface Props {}

const RegisterPage: React.FC<Props> = () => {
  const [showPassword, setShowPassword] = useState(false)
  const handleClick = useCallback(() => {
    setShowPassword((state) => !state)
  }, [])
  const toast = useToast({
    position: 'top-right',
  })

  const { control, handleSubmit, reset } = useForm<RegisterBody>({
    resolver: zodResolver(regsiterBodySchema),
  })

  const [registerAccount, isLoading, error] = useHttpsCallable<
    unknown,
    { success: boolean; text: string }
  >(firebaseFunctions, 'registerAccount')

  const navigate = useNavigate()

  useEffect(() => {
    const initialize = async () => {
      await Window.getCurrent().setTitle('Create an account')
      await Window.getCurrent().maximize()
    }
    initialize().catch((e) => {
      console.error(e)
    })
  }, [])

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error?.message,
        status: 'error',
      })
    }
  }, [error, toast])

  const onSubmit = handleSubmit((data) => {
    registerAccount(data)
      .then((response) => {
        if (response) {
          toast({
            title: 'Success',
            description: response.data.text,
            status: 'success',
          })
          reset()
          navigate('/')
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
        minWidth="650px"
      >
        <Heading
          color="gray.700"
          fontSize={{ base: '2xl', '2xl': '4xl' }}
          as="h1"
          textTransform="capitalize"
        >
          Create an account
        </Heading>

        <form onSubmit={onSubmit}>
          <Stack mt="5" spacing="4">
            <Controller
              name="firstName"
              control={control}
              render={({ field: { name, onBlur, onChange }, fieldState }) => (
                <FormControl isInvalid={fieldState.invalid}>
                  <InputGroup bg="white">
                    <InputLeftElement pointerEvents="none" h="full">
                      <Icon color="gray.300" as={BiSolidUser} my="auto" />
                    </InputLeftElement>
                    <Input
                      type="text"
                      autoComplete="given-name"
                      placeholder="Firstname"
                      size="lg"
                      name={name}
                      onBlur={onBlur}
                      onChange={(e) => onChange(e.target.value)}
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
              name="lastName"
              control={control}
              render={({ field: { name, onBlur, onChange }, fieldState }) => (
                <FormControl isInvalid={fieldState.invalid}>
                  <InputGroup bg="white">
                    <InputLeftElement pointerEvents="none" h="full">
                      <Icon color="gray.300" as={BiSolidUser} my="auto" />
                    </InputLeftElement>

                    <Input
                      type="text"
                      autoComplete="family-name"
                      placeholder="Lastname"
                      size="lg"
                      name={name}
                      onBlur={onBlur}
                      onChange={(e) => onChange(e.target.value)}
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
              name="email"
              control={control}
              render={({ field: { name, onBlur, onChange }, fieldState }) => (
                <FormControl isInvalid={fieldState.invalid}>
                  <InputGroup bg="white">
                    <InputLeftElement pointerEvents="none" h="full">
                      <Icon color="gray.300" as={MdAlternateEmail} my="auto" />
                    </InputLeftElement>
                    <Input
                      type="email"
                      placeholder="Email"
                      size="lg"
                      name={name}
                      onBlur={onBlur}
                      onChange={(e) => onChange(e.target.value)}
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
              control={control}
              name="password"
              render={({ field: { onBlur, onChange, name }, fieldState }) => (
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
                      name={name}
                      onBlur={onBlur}
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
            <Controller
              name="role"
              control={control}
              render={({ field: { name, onBlur, onChange }, fieldState }) => (
                <FormControl isInvalid={fieldState.invalid}>
                  <InputGroup bg="white">
                    <Select
                      placeholder="Select Role"
                      color="gray.700"
                      size="lg"
                      name={name}
                      onBlur={onBlur}
                      onChange={(e) => onChange(e.target.value)}
                    >
                      <option value="Medical Practitional">
                        Medical Practitional
                      </option>
                      <option value="Patient">Patient</option>
                      <option value="Education">Education</option>
                      <option value="Individual">Individual</option>
                    </Select>
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
              Register
            </Button>
          </Stack>
        </form>

        <Stack columnGap={2} mt="5" textAlign="center">
          <Text fontSize="xl" color="gray.400">
            or
          </Text>
          <Link
            to="/"
            as={RouterLink}
            color="blue.600"
            textTransform="capitalize"
            fontWeight="semibold"
          >
            Log into an Existing Account
          </Link>
        </Stack>
      </Box>
    </Flex>
  )
}

export default RegisterPage
