export type WithTimestamps<T extends object> = {
  createdAt: string
  updatedAt: string
} & T
