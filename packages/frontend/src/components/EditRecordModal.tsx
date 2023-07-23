import React, { useEffect, useState } from 'react'
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
  GetLiverRecordSchema,
  UpdateLiverRecordSchema,
  updateLiverRecordSchema,
} from '@/schemas/liverRecord'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateDoc, doc, getDoc } from 'firebase/firestore'
import { firebaseFirestore } from '@/firebase'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import type * as DialogPrimitive from '@radix-ui/react-dialog'

interface Props extends Omit<DialogPrimitive.DialogProps, 'children'> {
  record: GetLiverRecordSchema
  onClose?: () => void
}

const EditRecordModal: React.FC<Props> = ({ record, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { control, handleSubmit, reset } = useForm<UpdateLiverRecordSchema>({
    resolver: zodResolver(updateLiverRecordSchema),
    defaultValues: updateLiverRecordSchema.parse(record),
  })
  const toast = useToast({
    position: 'top-right',
  })

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true)
    updateDoc(doc(firebaseFirestore, 'liverRecords', record.id), data)
      .then(() => {
        toast({
          status: 'success',
          title: 'Success',
          description: 'Record updated successfully',
        })
      })
      .catch((e) => {
        const err = e as Error
        toast({
          status: 'error',
          title: 'Error',
          description:
            err?.message || 'An error occurred while updating record',
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
          <DialogTitle>Edit Record</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form onSubmit={onSubmit}>
            <Stack rowGap={2} mt={5}>
              <Controller
                control={control}
                name="title"
                render={({
                  field: { name, onChange, onBlur, value },
                  fieldState,
                }) => (
                  <FormControl isInvalid={fieldState.invalid}>
                    <Input
                      type="text"
                      placeholder="Title"
                      name={name}
                      defaultValue={value}
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
                    field: { name, onChange, onBlur, value },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput defaultValue={value}>
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
                    field: { name, onChange, onBlur, value },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <Select
                        placeholder="Gender"
                        defaultValue={value}
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
                    field: { name, onChange, onBlur, value },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput defaultValue={value}>
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
                    field: { name, onChange, onBlur, value },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput defaultValue={value}>
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
                    field: { name, onChange, onBlur, value },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput defaultValue={value}>
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
                    field: { name, onChange, onBlur, value },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput defaultValue={value}>
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
                    field: { name, onChange, onBlur, value },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput defaultValue={value}>
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
                    field: { name, onChange, onBlur, value },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput defaultValue={value}>
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
                    field: { name, onChange, onBlur, value },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput defaultValue={value}>
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
                    field: { name, onChange, onBlur, value },
                    fieldState,
                  }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                      <NumberInput defaultValue={value}>
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
                Edit Record
              </Button>
            </DialogFooter>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default EditRecordModal
