export interface IUserNoDoc {
  _id: string
  email: string
  password: string
}

export interface IUserGetAcessTokenReponse {
  accessToken: string
}

export interface IUserSaveDoc {
  name: string
  email: string
  password: string
  accessToken?: string
}
