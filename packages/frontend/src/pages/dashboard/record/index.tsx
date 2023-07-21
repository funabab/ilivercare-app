import React, { useEffect } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useParams } from 'react-router-dom'
import { doc } from 'firebase/firestore'
import { firebaseFirestore } from '@/firebase'
import { LoaderScreen } from '@/components/Loader'
import { FirebaseError } from 'firebase/app'
import { GetLiverRecordSchema } from '@/schemas/liverRecord'

interface Props {}

const DashboardRecordPage: React.FC<Props> = () => {
  const { recordId } = useParams()
  const navigate = useNavigate()
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
      </Container>
    </React.Fragment>
  )
}

export default DashboardRecordPage
