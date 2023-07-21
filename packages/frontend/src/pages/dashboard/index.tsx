import React, { useEffect } from 'react'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  Container,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  VisuallyHidden,
  Button,
  ButtonGroup,
  useDisclosure,
} from '@chakra-ui/react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { BiHealth } from 'react-icons/bi'
import { MdAdd } from 'react-icons/md'
import { window as Window } from '@neutralinojs/lib'
import { CgMoreVerticalO } from 'react-icons/cg'
import AddRecordModal from '@/components/AddRecordModal'
import { Link as RouterLink } from 'react-router-dom'

interface Props {}

const DashboardHomePage: React.FC<Props> = () => {
  const {
    isOpen: isAddRecordModalOpen,
    onClose: onCloseAddRecordModal,
    onOpen: onOpenAddRecordModal,
  } = useDisclosure()

  useEffect(() => {
    Window.setTitle('iLiverCare Dashboard').catch((e) => console.log(e))
  }, [])

  return (
    <DashboardLayout>
      <Container maxW="container.xl" py={10}>
        <Breadcrumb>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#" fontWeight="semibold" fontSize="xl">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <SimpleGrid
          columns={{ base: 2, xl: 4 }}
          gap={{ base: 5, xl: 10 }}
          mt={10}
        >
          <Card variant="outline">
            <CardBody>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                columnGap={5}
              >
                <Icon as={BiHealth} fontSize="3xl" color="green.800" />
                <Text fontWeight="semibold">Total Records</Text>
              </Flex>
              <Text as="p" textAlign="right" fontSize="4xl" color="green.800">
                0
              </Text>
            </CardBody>
          </Card>

          <Card variant="outline">
            <CardBody>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                columnGap={5}
              >
                <Icon as={BiHealth} fontSize="3xl" color="gray.800" />
                <Text fontWeight="semibold">Total Unevaluted Records</Text>
              </Flex>
              <Text as="p" textAlign="right" fontSize="4xl" color="gray.800">
                0
              </Text>
            </CardBody>
          </Card>

          <Card variant="outline">
            <CardBody>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                columnGap={5}
              >
                <Icon as={BiHealth} fontSize="3xl" color="green.800" />
                <Text fontWeight="semibold">Total Postive Records</Text>
              </Flex>
              <Text as="p" textAlign="right" fontSize="4xl" color="green.800">
                0
              </Text>
            </CardBody>
          </Card>

          <Card variant="outline">
            <CardBody>
              <Flex
                alignItems="center"
                justifyContent="space-between"
                columnGap={5}
              >
                <Icon as={BiHealth} fontSize="3xl" color="red.800" />
                <Text fontWeight="semibold">Total Negative Records</Text>
              </Flex>
              <Text as="p" textAlign="right" fontSize="4xl" color="red.800">
                0
              </Text>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Box mt={10}>
          <Box textAlign="right" my="5">
            <ButtonGroup isAttached>
              <Button
                colorScheme="green"
                leftIcon={<MdAdd />}
                onClick={() => onOpenAddRecordModal()}
              >
                Add Record
              </Button>

              <Button colorScheme="green" variant="outline">
                Export Records
              </Button>
            </ButtonGroup>
          </Box>
          <TableContainer bg="white">
            <Table variant="simple" layout="auto">
              <Thead>
                <Tr>
                  <Th>
                    <VisuallyHidden>Index</VisuallyHidden>
                  </Th>
                  <Th>Title</Th>
                  <Th>Age</Th>
                  <Th>Gender</Th>
                  <Th>Added At</Th>
                  <Th>Liver Problem</Th>
                  <Th>
                    <VisuallyHidden>Action</VisuallyHidden>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontSize="sm" isNumeric>
                    1
                  </Td>
                  <Td>
                    <RouterLink to={`/dashboard/record/1`}>
                      <Text maxW="50ch" isTruncated>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Deleniti eveniet voluptas consequuntur officiis
                        animi earum at, nobis modi explicabo. Libero!
                      </Text>
                    </RouterLink>
                  </Td>
                  <Td>65</Td>
                  <Td>Male</Td>
                  <Td>25, July 2023</Td>
                  <Td>
                    <Text color="gray.700" textTransform="capitalize">
                      Unevaluated
                    </Text>
                  </Td>
                  <Td>
                    <Box textAlign="right">
                      <IconButton
                        aria-label="more action"
                        variant="ghost"
                        icon={<CgMoreVerticalO />}
                      />
                    </Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td fontSize="sm" isNumeric>
                    2
                  </Td>
                  <Td>
                    <RouterLink to={`/dashboard/record/2`}>
                      <Text maxW="50ch" isTruncated>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Quae, quibusdam! Nam dolor optio rerum molestiae,
                        ad veniam officiis voluptatem? Eius?
                      </Text>
                    </RouterLink>
                  </Td>
                  <Td>65</Td>
                  <Td>Female</Td>
                  <Td>25, July 2023</Td>
                  <Td>
                    <Text color="green.700">Positive</Text>
                  </Td>
                  <Td>
                    <Box textAlign="right">
                      <IconButton
                        aria-label="more action"
                        variant="ghost"
                        icon={<CgMoreVerticalO />}
                      />
                    </Box>
                  </Td>
                </Tr>
                <Tr>
                  <Td fontSize="sm" isNumeric>
                    3
                  </Td>
                  <Td>
                    <RouterLink to={`/dashboard/record/1`}>
                      <Text maxW="50ch" isTruncated>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Cumque distinctio quos, earum ex repudiandae nam
                        ea eius debitis natus quam!
                      </Text>
                    </RouterLink>
                  </Td>
                  <Td>25</Td>
                  <Td>Male</Td>
                  <Td>25, July 2023</Td>
                  <Td>
                    <Text color="red.700">Negative</Text>
                  </Td>
                  <Td>
                    <Box textAlign="right">
                      <IconButton
                        aria-label="more action"
                        variant="ghost"
                        icon={<CgMoreVerticalO />}
                      />
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Container>

      <AddRecordModal
        open={isAddRecordModalOpen}
        onClose={onCloseAddRecordModal}
      />
    </DashboardLayout>
  )
}

export default DashboardHomePage
