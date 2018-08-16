import fetch from 'node-fetch'
import { set, get, del } from 'src/database'
import {
  NOTIFICATION_SERVICE_URL,
  CONFIG_SMS_CODE_EXPIRY_SECONDS,
  JWT_ISSUER
} from 'src/constants'
import * as crypto from 'crypto'
import { resolve } from 'url'
import { createToken } from 'src/features/authenticate/service'

interface ICodeDetails {
  code: string
  createdAt: number
}

type SixDigitVerificationCode = string

export async function storeVerificationCode(nonce: string, code: string) {
  const codeDetails = {
    code,
    createdAt: Date.now()
  }

  await set(`verification_${nonce}`, JSON.stringify(codeDetails))
}

export async function generateVerificationCode(
  nonce: string,
  mobile: string
): Promise<SixDigitVerificationCode> {
  // TODO lets come back to how these are generated
  const code = Math.floor(100000 + Math.random() * 900000).toString()

  await storeVerificationCode(nonce, code)
  return code
}

export async function getVerificationCodeDetails(
  nonce: string
): Promise<ICodeDetails> {
  const codeDetails = await get(`verification_${nonce}`)
  return JSON.parse(codeDetails) as ICodeDetails
}

export function generateNonce() {
  return crypto
    .randomBytes(16)
    .toString('base64')
    .toString()
}

export async function sendVerificationCode(
  mobile: string,
  verificationCode: string
): Promise<void> {
  const params = {
    msisdn: mobile,
    message: verificationCode
  }

  await fetch(resolve(NOTIFICATION_SERVICE_URL, 'sms'), {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      Authorization: `Bearer ${createToken(
        'auth',
        ['service'],
        ['opencrvs:notification-user'],
        JWT_ISSUER
      )}`
    }
  })

  return undefined
}

export async function checkVerificationCode(
  nonce: string,
  code: string
): Promise<void> {
  const codeDetails: ICodeDetails = await getVerificationCodeDetails(nonce)

  const codeExpired =
    (Date.now() - codeDetails.createdAt) / 1000 >=
    CONFIG_SMS_CODE_EXPIRY_SECONDS

  if (code !== codeDetails.code) {
    throw new Error('sms code invalid')
  }

  if (codeExpired) {
    throw new Error('sms code expired')
  }
}

export async function deleteUsedVerificationCode(
  nonce: string
): Promise<boolean> {
  try {
    await del(`verification_${nonce}`)
    return true
  } catch (err) {
    throw Error(err.message)
  }
}
