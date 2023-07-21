import React, { useEffect, useMemo } from 'react'
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
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, query, where } from 'firebase/firestore'
import { firebaseAuth, firebaseFirestore } from '@/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GetLiverRecordSchema } from '@/schemas/liverRecord'
import Loader from '@/components/Loader'
import dayjs from 'dayjs'

interface Props {}

const DashboardHomePage: React.FC<Props> = () => {
  const {
    isOpen: isAddRecordModalOpen,
    onClose: onCloseAddRecordModal,
    onOpen: onOpenAddRecordModal,
  } = useDisclosure()

  const [user] = useAuthState(firebaseAuth)
  const [_values, isRecordLoading, _error, recordSnapshot] = useCollectionData(
    user
      ? query(
          collection(firebaseFirestore, 'liverRecords'),
          where('aid', '==', user.uid)
        )
      : null,
    {}
  )

  const records = recordSnapshot?.docs.map(
    (snapshot) =>
      ({
        ...snapshot.data(),
        id: snapshot.id,
      } as GetLiverRecordSchema)
  )

  const unevaluatedRecords = useMemo(
    () => records?.filter((record) => record.status === 'unevaluated'),
    [records]
  )
  const negativeRecords = useMemo(
    () => records?.filter((record) => record.status === 'positive'),
    [records]
  )
  const positiveRecords = useMemo(
    () => records?.filter((record) => record.status === 'negative'),
    [records]
  )

  useEffect(() => {
    Window.setTitle('iLiverCare Dashboard').catch((e) => console.log(e))
  }, [])

  const isLoading =
    isRecordLoading ||
    !records ||
    !unevaluatedRecords ||
    !negativeRecords ||
    !positiveRecords

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" w="100vw" h="100vh">
        <Loader />
      </Flex>
    )
  }

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
                {records.length}
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
                {unevaluatedRecords.length}
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
                <Text fontWeight="semibold">Total Positive Records</Text>
              </Flex>
              <Text as="p" textAlign="right" fontSize="4xl" color="green.800">
                {positiveRecords.length}
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
                {negativeRecords.length}
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
                {records.map((record, index) => (
                  <Tr key={record.id}>
                    <Td fontSize="sm" isNumeric>
                      {index + 1}
                    </Td>
                    <Td>
                      <RouterLink to={`/dashboard/record/${record.id}`}>
                        <Text maxW="50ch" isTruncated>
                          {record.title}
                        </Text>
                      </RouterLink>
                    </Td>
                    <Td>{record.age}</Td>
                    <Td>{{ '1': 'Male', '2': 'Female' }[record.gender]}</Td>
                    <Td>
                      {dayjs(record.createdAt?.toDate()).format('DD, MMM YYYY')}
                    </Td>
                    <Td>
                      <Text
                        color={
                          record.status === 'negative'
                            ? 'red.700'
                            : record.status === 'positive'
                            ? 'green.700'
                            : 'gray.700'
                        }
                        textTransform="capitalize"
                      >
                        {record.status}
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
                ))}
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
