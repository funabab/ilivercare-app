import React, { useEffect } from 'react'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom'
import { doc } from 'firebase/firestore'
import { firebaseFirestore, firebaseFunctions } from '@/firebase'
import { LoaderScreen } from '@/components/Loader'
import { FirebaseError } from 'firebase/app'
import { GetLiverRecordSchema } from '@/schemas/liverRecord'
import { useHttpsCallable } from 'react-firebase-hooks/functions'

interface Props {}

const DashboardRecordPage: React.FC<Props> = () => {
  const { recordId } = useParams()
  const navigate = useNavigate()
  const [runLiverPrediction, isPredicting] = useHttpsCallable(
    firebaseFunctions,
    'predictLiverRecord'
  )
  const toast = useToast({
    position: 'top-right',
  })

  const [_value, loading, error, recordSnapshot] = useDocumentData(
    recordId ? doc(firebaseFirestore, 'liverRecords', recordId) : null
  )

  const record = {
    ...(recordSnapshot?.data({
      serverTimestamps: 'previous',
    }) || {}),
    id: recordSnapshot?.id,
  } as GetLiverRecordSchema | undefined

  useEffect(() => {
    if (
      !recordId ||
      (error instanceof FirebaseError && error.code === 'permission-denied')
    ) {
      navigate('/dashboard')
    }
  }, [recordId, error, navigate])

  if (loading || !record) {
    return <LoaderScreen />
  }

  return (
    <React.Fragment>
      <Container maxW="container.xl" py={10}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink
              to="/dashboard"
              as={Link}
              fontWeight="semibold"
              fontSize="xl"
            >
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              href="#"
              as={Link}
              fontWeight="semibold"
              fontSize="xl"
            >
              {record.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Flex
          columnGap={10}
          justifyContent="space-between"
          rowGap={10}
          pt="10"
          direction={{ base: 'column', xl: 'row' }}
        >
          <Box order={{ base: 2, xl: 'unset' }}>
            <SimpleGrid
              columns={2}
              w="max-content"
              gap="5"
              p="5"
              border="1px"
              borderColor="gray.400"
              rounded="sm"
            >
              <Text as="strong">Age</Text>
              <Text as="p" textAlign="right">
                {record.age}
              </Text>

              <Text as="strong">Gender</Text>
              <Text as="p" textAlign="right">
                {{ '1': 'Male', '2': 'Female' }[record.gender]}
              </Text>
            </SimpleGrid>

            <SimpleGrid
              columns={2}
              w="max-content"
              mt="5"
              gap="5"
              p="5"
              border="1px"
              borderColor="gray.400"
              rounded="sm"
            >
              <Text as="strong">Direct Bilirubin</Text>
              <Text as="p" textAlign="right">
                {record.directBilirubin}
              </Text>

              <Text as="strong">Total Bilirubin</Text>
              <Text as="p" textAlign="right">
                {record.totalBilirubin}
              </Text>
            </SimpleGrid>

            <SimpleGrid
              columns={2}
              w="max-content"
              mt="5"
              gap="5"
              p="5"
              border="1px"
              borderColor="gray.400"
              rounded="sm"
            >
              <Text as="strong">Alkaline Phosphotase</Text>
              <Text as="p" textAlign="right">
                {record.alkalinePhosphotase}
              </Text>

              <Text as="strong">Alamine Aminotransferase</Text>
              <Text as="p" textAlign="right">
                {record.alamineAminotransferase}
              </Text>

              <Text as="strong">Aspartate Aminotransferase</Text>
              <Text as="p" textAlign="right">
                {record.aspartateAminotransferase}
              </Text>
            </SimpleGrid>

            <SimpleGrid
              columns={2}
              w="max-content"
              mt="5"
              gap="5"
              p="5"
              border="1px"
              borderColor="gray.400"
              rounded="sm"
            >
              <Text as="strong">Albumin</Text>
              <Text as="p" textAlign="right">
                {record.albumin}
              </Text>

              <Text as="strong">Aspartate Aminotransferase</Text>
              <Text as="p" textAlign="right">
                {record.aspartateAminotransferase}
              </Text>

              <Text as="strong">Total Protiens</Text>
              <Text as="p" textAlign="right">
                {record.totalProtiens}
              </Text>
            </SimpleGrid>
          </Box>

          <Stack alignItems={{ base: 'start', xl: 'end' }}>
            <Button colorScheme="green" variant="outline">
              Edit Record
            </Button>

            <SimpleGrid
              columns={2}
              w="max-content"
              mt="5"
              gap="3"
              p="5"
              border="1px"
              borderColor="gray.400"
              borderStyle="dashed"
              rounded="sm"
              alignItems="center"
            >
              <Text as="strong">Evaluation</Text>
              <Text
                as="p"
                textAlign="right"
                textTransform="capitalize"
                fontSize="2xl"
                color={
                  record.status === 'negative'
                    ? 'red.700'
                    : record.status === 'positive'
                    ? 'green.700'
                    : 'gray.700'
                }
              >
                {record.status}
              </Text>
              {false && (
                <React.Fragment>
                  <Text as="strong">Accuracy</Text>
                  <Text as="p" textAlign="right" fontSize="2xl">
                    70.00%
                  </Text>
                </React.Fragment>
              )}
              <Button
                gridRowStart={5}
                gridColumnStart={1}
                gridColumnEnd={3}
                size="lg"
                colorScheme="green"
                isLoading={isPredicting}
                onClick={() => {
                  runLiverPrediction({ ...record, recordId: record.id })
                    .then(() => {
                      toast({
                        status: 'success',
                        title: 'Success',
                        description: 'Model status updated',
                      })
                    })
                    .catch(() => {
                      toast({
                        status: 'error',
                        title: 'Error',
                        description:
                          'An error occurred while running prediction',
                      })
                    })
                }}
              >
                Prediction
              </Button>
            </SimpleGrid>
          </Stack>
        </Flex>
      </Container>
    </React.Fragment>
  )
}

export default DashboardRecordPage
