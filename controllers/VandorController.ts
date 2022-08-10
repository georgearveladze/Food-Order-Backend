import { json } from 'body-parser'
import { Request, Response, NextFunction } from 'express'
import { VandorLoginInputs } from '../dto'
import { ValidatePassword } from '../utility'
import { FindVandor } from './AdminController'

export const VandorLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = <VandorLoginInputs>req.body

  const existingVandor = await FindVandor('', email)
  try {
    if (existingVandor !== null) {
      const validation = await ValidatePassword(
        password,
        existingVandor.password,
        existingVandor.salt
      )
      //   return res.status(200).json({ existingVandor })
      if (validation) {
        return res.status(200).json({ existingVandor })
      } else {
        return res.json({ massage: 'incorect password' })
      }
    }
  } catch {
    return res.json({ massage: 'login creditals not valid' })
  }
}
