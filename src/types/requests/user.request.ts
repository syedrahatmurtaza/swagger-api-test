export interface IUserRegisterRequest {
  name: string
  email: string
  password: string
  userType: string
}

export interface IUserUpdateRequest {
  _id: string
  name: string
  email: string
  password: string
  userType: string
  accessToken: string
  createdAt: string
  updatedAt: string
}

export interface IUserGetUserRequest {
  _id: string
}
