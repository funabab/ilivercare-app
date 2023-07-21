import React, { useState } from 'react'
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  SimpleGrid,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { BsDatabaseAdd } from 'react-icons/bs'
import { Controller, useForm } from 'react-hook-form'
import {
  CreateLiverRecordSchema,
  createLiverRecordSchema,
} from '@/schemas/liverRecord'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { firebaseAuth, firebaseFirestore } from '@/firebase'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import type * as DialogPrimitive from '@radix-ui/react-dialog'
import { useAuthState } from 'react-firebase-hooks/auth'

interface Props extends Omit<DialogPrimitive.DialogProps, 'children'> {
  onClose?: () => void
}

const AddRecordModal: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user] = useAuthState(firebaseAuth)
  const { control, handleSubmit, reset } = useForm<CreateLiverRecordSchema>({
    resolver: zodResolver(createLiverRecordSchema),
    defaultValues: {
      aid: user?.uid,
      status: 'unevaluated',
    },
  })

  const toast = useToast({
    position: 'top-right',
  })

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true)
    addDoc(collection(firebaseFirestore, 'liverRecords'), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
      .then(() => {
        toast({
          status: 'success',
          title: 'Successs',
          description: 'Record added successfully',
        })
      })
      .catch((e) => {
        const err = e as Error
        toast({
          status: 'error',
          title: 'Error',
          description:
            err?.message || 'An error occurred while creating record',
        })
      })
      .finally(() => {
        setIsLoading(false)
        reset()
        props.onClose && props?.onClose()
      })
  })

  return (
    <Dialog
      {...props}
      onOpenChange={(open) => !open && props?.onClose && props.onClose()}
    >
      <DialogContent className="!w-[850px] max-w-[95vw]">
        <DialogHeader>
          <DialogTitle>Add New Record</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form onSubmit={onSubmit}>
            <Stack rowGap={2} mt={5}>
              <Controller
                control={control}
                name="title"
                render={({ field: { name, onChange, onBlur }, fieldState }) => (
                  <FormControl isInvalid={fieldState.invalid}>
                    <Input
                      type="text"
                      placeholder="Title"
                      name={name}
                      onChange={(e) => onChange(e.target.value)}
                      onBlur={onBlur}
                    />
                    {fieldState.error?.message && (
                      <FormErrorMessage>
                        {fieldState.error.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
              <SimpleGrid columns={2} columnGap={2}>
                <Controller
                  control={control}
                  name="age"
                  render={({
                    field: { name, onChange, onBlur },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput>
                        <NumberInputField
                          placeholder="Age"
                          name={name}
                          onChange={(e) => onChange(e.target.value)}
                          onBlur={onBlur}
                        />
                      </NumberInput>

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
                  name="gender"
                  render={({
                    field: { name, onChange, onBlur },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <Select
                        placeholder="Gender"
                        name={name}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={onBlur}
                      >
                        <option value={1}>Male</option>
                        <option value={2}>Female</option>
                      </Select>
                      {fieldState.error?.message && (
                        <FormErrorMessage>
                          {fieldState.error.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
              </SimpleGrid>

              <SimpleGrid columns={2} columnGap={2}>
                <Controller
                  control={control}
                  name="directBilirubin"
                  render={({
                    field: { name, onChange, onBlur },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput>
                        <NumberInputField
                          placeholder="Direct Bilirubin"
                          name={name}
                          onChange={(e) => onChange(e.target.value)}
                          onBlur={onBlur}
                        />
                      </NumberInput>

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
                  name="totalBilirubin"
                  render={({
                    field: { name, onChange, onBlur },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput>
                        <NumberInputField
                          placeholder="Total Bilirubin"
                          name={name}
                          onChange={(e) => onChange(e.target.value)}
                          onBlur={onBlur}
                        />
                      </NumberInput>

                      {fieldState.error?.message && (
                        <FormErrorMessage>
                          {fieldState.error.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
              </SimpleGrid>

              <SimpleGrid columns={3} columnGap={2}>
                <Controller
                  control={control}
                  name="alkalinePhosphotase"
                  render={({
                    field: { name, onChange, onBlur },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput>
                        <NumberInputField
                          placeholder="Alkaline Phosphotase"
                          name={name}
                          onChange={(e) => onChange(e.target.value)}
                          onBlur={onBlur}
                        />
                      </NumberInput>

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
                  name="alamineAminotransferase"
                  render={({
                    field: { name, onChange, onBlur },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput>
                        <NumberInputField
                          placeholder="Alamine Aminotransferase"
                          name={name}
                          onChange={(e) => onChange(e.target.value)}
                          onBlur={onBlur}
                        />
                      </NumberInput>

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
                  name="aspartateAminotransferase"
                  render={({
                    field: { name, onChange, onBlur },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput>
                        <NumberInputField
                          placeholder="Aspartate Aminotransferase"
                          name={name}
                          onChange={(e) => onChange(e.target.value)}
                          onBlur={onBlur}
                        />
                      </NumberInput>

                      {fieldState.error?.message && (
                        <FormErrorMessage>
                          {fieldState.error.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
              </SimpleGrid>

              <SimpleGrid columns={3} columnGap={2}>
                <Controller
                  control={control}
                  name="totalProtiens"
                  render={({
                    field: { name, onChange, onBlur },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput>
                        <NumberInputField
                          placeholder="Total Protiens"
                          name={name}
                          onChange={(e) => onChange(e.target.value)}
                          onBlur={onBlur}
                        />
                      </NumberInput>

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
                  name="albumin"
                  render={({
                    field: { name, onChange, onBlur },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput>
                        <NumberInputField
                          placeholder="Albumin"
                          name={name}
                          onChange={(e) => onChange(e.target.value)}
                          onBlur={onBlur}
                        />
                      </NumberInput>

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
                  name="albuminAndGlobulinRatio"
                  render={({
                    field: { name, onChange, onBlur },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput>
                        <NumberInputField
                          placeholder="Albumin and Globulin Ratio"
                          name={name}
                          onChange={(e) => onChange(e.target.value)}
                          onBlur={onBlur}
                        />
                      </NumberInput>

                      {fieldState.error?.message && (
                        <FormErrorMessage>
                          {fieldState.error.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
              </SimpleGrid>
            </Stack>

            <DialogFooter className="mt-5">
              <Button
                isLoading={isLoading}
                size="lg"
                colorScheme="green"
                leftIcon={<BsDatabaseAdd />}
                type="submit"
              >
                Add Record
              </Button>
            </DialogFooter>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default AddRecordModal
