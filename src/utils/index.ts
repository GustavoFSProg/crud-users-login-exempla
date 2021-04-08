/* eslint-disable import/extensions */
/* eslint-disable no-shadow */
import { IUser } from '../interfaces/index'
// import res from 'globalVariables'
import md5 from 'md5'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// eslint-disable-next-line import/no-unresolved
// import { res } from 'globalVariables'

dotenv.config()

// export function encryptPassword(password: string) {
//   return md5(password, process.env.SECRET as string & { asBytes: true })
// }

// export function isValidEmail(email: string) {
//   // eslint-disable-next-line no-useless-escape
//   return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
// }

// // eslint-disable-next-line no-unused-vars

// export function isValidPassword(password: string) {
//   const valid = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/
//   if (valid.test(password)) return true
//   return false
// }

export async function generateToken(data: IUser | undefined) {
  if (!data) throw Error(`Generate token error`)
  const { email, password } = data
  const { SECRET } = process.env

  const token = await jwt.sign({ email, password }, SECRET || '', { expiresIn: '1d' })

  return token
}

export async function decodeToken(token: string) {
  const secret = (process.env.SECRET || '') as string & { json: true }

  return jwt.decode(token, secret)
}

export function verifyToken(token: string) {
  return jwt.verify(token, process.env.SECRET || '', (error, decode) => {
    if (error) return { error }
    return { decode }
  })
}

// function CpfAllValidation(res: any, req: any) {
//   const { cpfField } = req.body

//   function isValidCPF(cpfCamp: string) {
//     // eslint-disable-next-line no-useless-escape
//     return /.[0-9]){3}./.test(cpfCamp)
//   }
//   const verifyCPF = cpf.isValid(cpfField)

//   const returno = isValidCPF(cpfField)

//   if (!returno || !verifyCPF) {
//     return res.send({ Message: 'CPF invalido!' })
//   }
// }
