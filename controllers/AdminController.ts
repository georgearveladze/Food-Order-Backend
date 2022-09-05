import { Request, Response, NextFunction } from 'express'
import { CreateVandorInput } from '../dto'
import { Vandor } from '../models'
import { GanarateSalt, GeneratePassword } from '../utility'

export const FindVandor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await Vandor.findOne({ email: email })
  } else {
    return await Vandor.findById(id)
  }
}

export const CreateVandor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    address,
    pincode,
    foodType,
    email,
    password,
    ownerName,
    phone,
  } = <CreateVandorInput>req.body

  const existingVandor = await FindVandor('', email)

  if (existingVandor !== null) {
    return res.json({ message: 'A Vandor existing in this email ID' })
  }

  const salt = await GanarateSalt()
  const userPassword = await GeneratePassword(password, salt)

  const CreateVandor = await Vandor.create({
    name: name,
    address: address,
    pincode: pincode,
    foodType: foodType,
    email: email,
    password: userPassword,
    salt: salt,
    ownerName: ownerName,
    phone: phone,
    rating: 0,
    serviceAvalible: false,
    // coverImages:[]
  })
  return res.json(CreateVandor)
}

export const GetVandors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vandors = await Vandor.find()
  if (vandors !== null) {
    return res.json(vandors)
  }
  return res.json({ massage: 'vandors data not avalible' })
}



export const GetVandorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log('aq var')
    const vandorId = req.params?.id
    // console.log(vandorId)
    const vandor = await FindVandor(vandorId)

    if (vandor !== null) {
      return res.json(vandor)
    }

    return res.json({ masssage: 'vandorByID data not avalible' })
  } catch {
    return res.send('fuck')
  }
}
