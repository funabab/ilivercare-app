import React, { useMemo, useState } from 'react'
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
  useToast,
} from '@chakra-ui/react'
import { BiHealth } from 'react-icons/bi'
import { MdAdd } from 'react-icons/md'
import { CgMoreVerticalO } from 'react-icons/cg'
import AddRecordModal from '@/components/AddRecordModal'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, deleteDoc, doc, query, where } from 'firebase/firestore'
import { firebaseAuth, firebaseFirestore } from '@/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GetLiverRecordSchema } from '@/schemas/liverRecord'
import { LoaderScreen } from '@/components/Loader'
import dayjs from 'dayjs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import EditRecordModal from '@/components/EditRecordModal'
import { useWindowProps } from '@/hooks/useWindowProps'
import { dialog, fs, path } from '@tauri-apps/api'
import { unparse as toCSV } from 'papaparse'

interface Props {}

const DashboardHomePage: React.FC<Props> = () => {
  const {
    isOpen: isAddRecordModalOpen,
    onClose: onCloseAddRecordModal,
    onOpen: onOpenAddRecordModal,
  } = useDisclosure()

  useWindowProps({ title: 'iLiverCare Dashboard' })
  const navigate = useNavigate()

  const [user] = useAuthState(firebaseAuth)
  const [editedRecord, setEditedRecord] = useState<
    GetLiverRecordSchema | undefined
  >()

  const [_values, isRecordLoading, _error, recordSnapshot] = useCollectionData(
    user
      ? query(
          collection(firebaseFirestore, 'liverRecords'),
          where('aid', '==', user.uid)
        )
      : null,
    {}
  )
  const toast = useToast({
    position: 'top-right',
  })

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

  const handleOnExport = async () => {
    if (!records) {
      return
    }

    const downloadDir = await path.documentDir()
    const filePath = await dialog.save({
      defaultPath: downloadDir + 'record.csv',
    })

    if (filePath) {
      await fs.writeFile(
        filePath,
        toCSV(
          records.map((record) => ({
            Age: record.age,
            Gender: record.gender,
            Total_Bilirubin: record.totalBilirubin,
            Direct_Bilirubin: record.directBilirubin,
            Alkaline_Phosphotase: record.alkalinePhosphotase,
            Alamine_Aminotransferase: record.alamineAminotransferase,
            Aspartate_Aminotransferase: record.aspartateAminotransferase,
            Total_Protiens: record.totalProtiens,
            Albumin: record.albumin,
            Albumin_and_Globulin_Ratio: record.albuminAndGlobulinRatio,
            Status: record.status,
          }))
        )
      )

      toast({
        status: 'success',
        title: 'Success',
        description: 'Records exported successfully',
      })
    }
  }

  const isLoading =
    isRecordLoading ||
    !records ||
    !unevaluatedRecords ||
    !negativeRecords ||
    !positiveRecords

  if (isLoading) {
    return <LoaderScreen />
  }

  return (
    <React.Fragment>
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
                <Text fontWeight="semibold">Total Unevaluted</Text>
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
                <Text fontWeight="semibold">Total Positive</Text>
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
                <Text fontWeight="semibold">Total Negative</Text>
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

              <Button
                colorScheme="green"
                variant="outline"
                onClick={() => handleOnExport()}
              >
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
                      {dayjs(record.createdAt?.toDate()).format(
                        'DD, MMM YYYY HH:mm:ss'
                      )}
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <IconButton
                              aria-label="more action"
                              variant="ghost"
                              size="lg"
                              icon={<CgMoreVerticalO />}
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="z-50">
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/dashboard/record/${record.id}`)
                              }
                            >
                              <DropdownMenuLabel>View</DropdownMenuLabel>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => setEditedRecord(record)}
                            >
                              <DropdownMenuLabel>Edit</DropdownMenuLabel>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                              <DropdownMenuLabel
                                className="text-red-700"
                                onClick={() =>
                                  deleteDoc(
                                    doc(
                                      firebaseFirestore,
                                      'liverRecords',
                                      record.id
                                    )
                                  )
                                }
                              >
                                Delete
                              </DropdownMenuLabel>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

      {editedRecord && (
        <EditRecordModal
          record={editedRecord}
          open={true}
          onClose={() => setEditedRecord(undefined)}
        />
      )}
    </React.Fragment>
  )
}

export default DashboardHomePage
