export interface IUserRegisterResponse {
  _id: string
  name: string
  email: string
  password: string
  userType: string
  accessToken: string
  createdAt: string
  updatedAt: string
}

export interface IUserRegisterErrorResponse {
  errorCode: number
  message: string
}

export interface IUserGetAllResposne {
  _id: string
  name: string
  email: string
  password: string
  accessToken: string
  userType: string
  createdAt: string
  updatedAt: string
}

export interface IUserUpdateResposne {
  _id: string
  name: string
  email: string
  password: string
  userType: string
  accessToken: string
  createdAt: string
  updatedAt: string
}

export interface IUserGetUserNotFoundReponse {
  errorCode: number
  message: string
}

export interface IUserGetUserResponse {
  _id: string
  name: string
  email: string
  password: string
  accessToken: string
  userType: string
  createdAt: string
  updatedAt: string
}
