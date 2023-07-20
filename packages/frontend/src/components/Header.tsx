import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { RxAvatar } from 'react-icons/rx'
import { MotionConfig } from 'framer-motion'
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '../firebase'

interface Props {}

const Header: React.FC<Props> = () => {
  const [user] = useAuthState(firebaseAuth)
  const [logout, isLoading] = useSignOut(firebaseAuth)
  const [role, setRole] = useState<string | undefined>()

  useEffect(() => {
    const setRoleFromToken = async () => {
      if (!user) {
        return
      }
      const token = await user.getIdTokenResult()
      setRole(token.claims.role as string)
    }

    setRoleFromToken().catch((e) => {
      console.error(e)
    })
  }, [user])

  return (
    <Flex bg="gray.200" py="5" shadow="md">
      <Container
        maxW="8xl"
        px="10"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Heading
            as="h1"
            fontSize="xl"
            color="gray.700"
            display="flex"
            alignItems="center"
            columnGap={4}
          >
            <Img src="/logo.png" h="10" />
            <Text fontSize="md">iLiverCare</Text>
          </Heading>
        </Box>
        <MotionConfig reducedMotion="always">
          <Menu>
            <MenuButton>
              <Flex alignItems="center" columnGap={3}>
                <Box>
                  <Text fontSize="sm">{user?.displayName}</Text>
                  <Text
                    color="gray.600"
                    fontSize="sm"
                    as="p"
                    textAlign="center"
                  >
                    {role}
                  </Text>
                </Box>
                <Icon as={RxAvatar} fontSize="4xl" color="gray.700" />
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => logout()} disabled={isLoading}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </MotionConfig>
      </Container>
    </Flex>
  )
}

export default Header
