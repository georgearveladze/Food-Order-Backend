import bcrypt from 'bcrypt'

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
