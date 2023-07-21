import { Timestamp } from 'firebase/firestore'

export type WithTimestamps<T extends object> = T & {
  createdAt: Timestamp | null
  updatedAt: Timestamp | null
}
