import { Request, Response, NextFunction } from 'express'
import { EditVandroInputs, VandorLoginInputs } from '../dto'
import { GenerateSignature, ValidatePassword } from '../utility'
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
      if (validation) {



        const signature = GenerateSignature({
          _id: existingVandor.id,
          email: existingVandor.email,
          foodTypes: existingVandor.foodType,
          name: existingVandor.name
        })

        return res.status(200).json({ signature })
      } else {
        return res.json({ massage: 'Password is not valid' })
      }
    }
  } catch {
    return res.json({ massage: 'login creditals not valid' })
  }
}



export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {

  const user = req.user

  if (user) {


    const existingVandor = await FindVandor(user._id)
    return res.json(existingVandor)
  }

  return res.json({ "masage": "Vandoor information not found" })


}


export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {



  const { foodTypes, name, address, phone } = <EditVandroInputs>req.body

  const user = req.user

  if (user) {
    const existingVandor = await FindVandor(user._id)
    if (existingVandor !== null) {
      existingVandor.name = name;
      existingVandor.address = address;
      existingVandor.phone = phone;
      existingVandor.foodType = foodTypes

      const savedResult = await existingVandor.save()
      return res.json(savedResult)
    }

    return res.json(existingVandor)
  }

  return res.json({ "masage": "Vandoor information not found" })
}

export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {

}