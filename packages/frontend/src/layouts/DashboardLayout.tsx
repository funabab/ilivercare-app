import React, { useEffect } from 'react'
import AuthProtect from '../components/AuthProtect'
import Header from '../components/Header'
import { Box, Flex } from '@chakra-ui/react'
import { window as Window } from '@neutralinojs/lib'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { useSignOut } from 'react-firebase-hooks/auth'
import { firebaseAuth } from '@/firebase'
import { app } from '@neutralinojs/lib'

interface Props {}

const DashboardLayout: React.FC<React.PropsWithChildren<Props>> = ({
  children,
}) => {
  const [logout, isLoading] = useSignOut(firebaseAuth)

  useEffect(() => {
    Window.maximize()
      .then(() =>
        Window.setSize({
          minWidth: 1280,
        })
      )
      .catch((e) => console.log(e))
  }, [])
  return (
    <AuthProtect>
      <Flex w="100vw" h="100vh" direction="column">
        <Menubar className="bg-slate-600 text-white border-none rounded-none">
          <MenubarMenu>
            <MenubarTrigger className="font-semibold">File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>About</MenubarItem>
              <MenubarItem onClick={() => logout()} disabled={isLoading}>
                Logout
              </MenubarItem>
              <MenubarItem onClick={() => app.exit()}>Exit</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Header />
        <Box flexGrow={1}>{children}</Box>
      </Flex>
    </AuthProtect>
  )
}

export default DashboardLayout
