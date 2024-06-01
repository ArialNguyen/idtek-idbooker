export type UserRoleType = 'Admin' | 'Recruiter' | 'JobSeeker'

export default interface UserType {
  role: "Owner" | "Customer",
  name: string,
  id: string,
  email: string,
  phone: string,
  password: string
}

export interface UserSessionType {
  role: "Owner" | "Customer",
  name: string,
  id: string,
  email: string,
  phone: string,
  image: string | null
}


export interface JWTSessionType {
  user: {
    role: "Owner" | "Customer",
    name: string,
    id: string,
    email: string,
    phone: string
    image: string
  },
  accessToken: string,
  refreshToken: string
}