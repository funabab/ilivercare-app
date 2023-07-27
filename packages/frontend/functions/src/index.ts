/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { beforeUserSignedIn } from 'firebase-functions/v2/identity'
import { getAuth } from 'firebase-admin/auth'
import { signInWithCustomToken, sendEmailVerification } from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import { initializeApp } from 'firebase-admin/app'
import {
  regsiterBodySchema,
  getLiverRecordPredictionSchema,
} from '../../src/schemas'
import { ZodError } from 'zod'
import { initializeApp as initializeClientApp } from 'firebase/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth as getClientAuth } from 'firebase/auth'
import model from '../model.json'
import Classifier from 'ml-knn'

declare const process: { env: Record<string, string> }
initializeApp()

const classifier = Classifier.load(model)

export const registerAccount = onCall({ maxInstances: 10 }, async (request) => {
  const firebaseClientApp = initializeClientApp({
    apiKey: process.env.APP_FIREBASE_API_KEY,
    authDomain: process.env.APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.APP_FIREBASE_APP_ID,
  })
  const firebaseClientAuth = getClientAuth(firebaseClientApp)

  try {
    const data = regsiterBodySchema.parse(request.data)
    const auth = getAuth()
    const user = await auth.createUser({
      email: data.email,
      password: data.password,
      displayName: `${data.firstName} ${data.lastName}`,
      emailVerified: false,
    })

    await auth.setCustomUserClaims(user.uid, {
      role: data.role,
    })

    const token = await auth.createCustomToken(user.uid)
    const clientUserCredential = await signInWithCustomToken(
      firebaseClientAuth,
      token
    )
    await sendEmailVerification(clientUserCredential.user)

    return {
      success: true,
      text: 'Account created successfully, kindly verify your email',
    }
  } catch (e) {
    console.log('Error /registerAccount', e)
    if (e instanceof ZodError) {
      throw new HttpsError('invalid-argument', 'Invalid input')
    } else if (e instanceof Error) {
      const error = e as FirebaseError
      if (error.code === 'auth/email-already-exists') {
        throw new HttpsError(
          'already-exists',
          'Account with email already exists'
        )
      }
    }
    throw new HttpsError(
      'internal',
      'Something went wrong while creating account'
    )
  }
})

export const beforeUserSignedInHandler = beforeUserSignedIn(
  { maxInstances: 10 },
  (event) => {
    const user = event.data
    if (!user?.emailVerified) {
      throw new HttpsError(
        'aborted',
        'auth/email-not-verified Email not verified'
      )
    } else if (!user?.customClaims?.role) {
      throw new HttpsError('aborted', 'Role not set')
    }
  }
)

export const predictLiverRecord = onCall(
  { maxInstances: 10 },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User not authenticated')
    }

    try {
      const data = getLiverRecordPredictionSchema.parse(request.data)
      const liverRecordDoc = await getFirestore()
        .doc(`liverRecords/${data.recordId}`)
        .get()

      if (
        !liverRecordDoc.exists ||
        liverRecordDoc.data()?.aid !== request.auth?.uid
      ) {
        throw new HttpsError('not-found', 'Record not found')
      }

      const prediction = classifier.predict([
        data.age,
        data.gender,
        data.totalBilirubin,
        data.directBilirubin,
        data.alkalinePhosphotase,
        data.alamineAminotransferase,
        data.aspartateAminotransferase,
        data.totalProtiens,
        data.albumin,
        data.albuminAndGlobulinRatio,
      ]) as number

      await getFirestore()
        .doc(`liverRecords/${data.recordId}`)
        .update({
          status: prediction === 1 ? 'positive' : 'negative',
        })

      return {
        success: true,
        message: 'Prediction updated successful',
      }
    } catch (e) {
      console.log('Error /predictLiverRecord', e)
      if (e instanceof ZodError) {
        throw new HttpsError('invalid-argument', 'Invalid input')
      } else if (e instanceof Error) {
        const error = e as FirebaseError
        if (error.code === 'auth/email-already-exists') {
          throw new HttpsError(
            'already-exists',
            'Account with email already exists'
          )
        }
      }
      throw new HttpsError(
        'internal',
        'Something went wrong while creating account'
      )
    }
  }
)
