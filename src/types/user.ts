export type UserRoleType = 'Admin' | 'Recruiter' | 'JobSeeker'

export default interface UserType {
  role: "Owner" | "Customer",
  name: string,
  id: string,
  email: string,
  phone: string
}

export interface UserSessionType {
  role: "Owner" | "Customer",
  name: string,
  id: string,
  email: string,
  phone: string
}


export interface JWTSessionType {
  user: {
    role: "Owner" | "Customer",
    name: string,
    id: string,
    email: string,
    phone: string
  },
  accessToken: string,
  refreshToken: string
}