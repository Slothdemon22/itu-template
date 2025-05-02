import { Roles } from '@/types/globals'
import { auth } from '@clerk/nextjs/server'

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth()
  const Role=sessionClaims?.metadata.role === role
  console.log("Role", Role)
  return Role
}