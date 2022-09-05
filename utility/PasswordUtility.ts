import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { APP_SECRET } from '../config'
import { VandorPayload } from '../dto'
import { Request } from 'express'
import { AuthPayload } from '../dto/Auth.dto'

export const GanarateSalt = async () => {
  return await bcrypt.genSalt()
}

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt)
}

export const ValidatePassword = async (
  enderedPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GeneratePassword(enderedPassword, salt)) === savedPassword
}



export const GenerateSignature = (payload: VandorPayload) => {

  return jwt.sign(payload, APP_SECRET, { expiresIn: "1d" })
}




export const ValidateSignature = async (req: Request) => {
  const signature = req.get("authorization")
  // console.log(signature)
  if (signature) {
    // console.log(signature.split(" ")[1])
    console.log(APP_SECRET)
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET) as AuthPayload

    req.user = payload

    return true

  }

  return false

}