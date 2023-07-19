import { HttpsError, onCall } from 'firebase-functions/v2/https'
import { getAuth } from 'firebase-admin/auth'
import { signInWithCustomToken, sendEmailVerification } from 'firebase/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { FirebaseError } from '@firebase/util'
import { initializeApp } from 'firebase-admin/app'
import { regsiterBodySchema } from '../../src/schemas'
import { ZodError } from 'zod'
import { initializeApp as initializeClientApp } from 'firebase/app'
import { getAuth as getClientAuth } from 'firebase/auth'

declare const process: { env: Record<string, string> }
initializeApp()

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
    const firestore = getFirestore()
    const auth = getAuth()
    await firestore.runTransaction(async (transaction) => {
      const user = await auth.createUser({
        email: data.email,
        password: data.password,
        displayName: `${data.firstName} ${data.lastName}`,
        emailVerified: false,
      })

      transaction.set(firestore.doc(`user/${user.uid}`), {
        ...(JSON.parse(JSON.stringify(user)) as object),
        role: data.role,
      })

      const token = await auth.createCustomToken(user.uid)
      const clientUserCredential = await signInWithCustomToken(
        firebaseClientAuth,
        token
      )
      await sendEmailVerification(clientUserCredential.user)
    })

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
