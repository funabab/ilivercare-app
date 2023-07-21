import { z } from 'zod'

export const createLiverRecordSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .trim()
    .min(1, { message: 'Title is required' }),
  age: z.coerce.number({
    required_error: 'Age is required',
    invalid_type_error: 'Enter a valid number for age',
  }),
  gender: z.coerce
    .number({
      required_error: 'Gender is required',
      invalid_type_error: 'Please select a valid gender value',
    })
    .refine(
      (gender) => [1, 2].indexOf(gender) !== -1,
      'Please select a valid gender value'
    ),
  directBilirubin: z
    .string({
      required_error: 'Direct Bilirubin is required',
      invalid_type_error: 'Enter a valid number for Direct Bilirubin',
    })
    .trim()
    .min(1, {
      message: 'Direct Bilirubin is required',
    }),
  totalBilirubin: z.coerce.number({
    required_error: 'Total Bilirubin is required',
    invalid_type_error: 'Enter a valid number for Total Bilirubin',
  }),
  alkalinePhosphotase: z.coerce.number({
    required_error: 'Alkaline Phosphotase is required',
    invalid_type_error: 'Enter a valid number for Alkaline Phosphotase',
  }),
  alamineAminotransferase: z.coerce.number({
    required_error: 'Alamine Aminotransferase is required',
    invalid_type_error: 'Enter a valid number for Alamine Aminotransferase',
  }),
  aspartateAminotransferase: z.coerce.number({
    required_error: 'Aspartate Aminotransferase is required',
    invalid_type_error: 'Enter a valid number for Aspartate Aminotransferase',
  }),
  totalProtiens: z.coerce.number({
    required_error: 'Total Protiens is required',
    invalid_type_error: 'Enter a valid number for Total Protiens',
  }),
  albumin: z.coerce.number({
    required_error: 'Albumin is required',
    invalid_type_error: 'Enter a valid number for Albumin',
  }),
  albuminAndGlobulinRatio: z.coerce.number({
    required_error: 'Enter a valid number for Albumin and Globulin Ratio',
  }),
})

export type CreateLiverRecordSchema = z.infer<typeof createLiverRecordSchema>
