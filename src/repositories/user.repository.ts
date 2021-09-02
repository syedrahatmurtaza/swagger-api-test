import { IUserNoDoc, IUserSaveDoc } from '../interfaces/user.interface'
import jwt from 'jsonwebtoken'
import { serverSecret } from '../utils/constants'
import {
  IUserRegisterRequest,
  IUserUpdateRequest,
} from '../types/requests/user.request'
import {
  IUserRegisterErrorResponse,
  IUserRegisterResponse,
  IUserUpdateResposne,
} from '../types/responses/user.response'
import { UserModel } from '../models/user.model'
import { IUser } from '../types/documents/user.document'
import { isValidObjectId } from 'mongoose'
import { InvalidObjectIdError } from '../interfaces/error.interface'

export class UserRepository {
  constructor() {}

  async registerUser(
    request: IUserRegisterRequest
  ): Promise<IUserRegisterResponse | IUserRegisterErrorResponse> {
    const user: IUser[] = await UserModel.find().where('email', request.email)
    if (user.length !== 0) {
      return <IUserRegisterErrorResponse>{
        errorCode: 200,
        message: 'User already registered',
      }
    } else {
      const token = await jwt.sign(request, serverSecret)
      const saveUserObj: IUserSaveDoc = request
      saveUserObj.accessToken = token
      const userNew = await new UserModel(saveUserObj).save()
      return <IUserRegisterResponse | any>userNew
    }
  }

  async getAllUsers() {
    let users: IUser[] = await UserModel.find()
    return users
  }

  async getUser(userId: string) {
    if (isValidObjectId(userId)) {
      return await UserModel.find().where('_id', userId)
    }

    return <InvalidObjectIdError>{
      errorCode: 404,
      message: 'Invalid Object Id',
    }
  }

  async updateUser(user: IUserUpdateRequest) {
    return await UserModel.findByIdAndUpdate(user._id, user, { new: true })
  }

  getAccessToken(user: IUserNoDoc) {
    var tokenFound: string | undefined = jwt.sign(user, serverSecret)
    return tokenFound
  }
}
