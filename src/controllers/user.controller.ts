import {
  Body,
  Controller,
  Example,
  Get,
  Path,
  Post,
  Put,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa'
import {
  IUserNoDoc,
  IUserGetAcessTokenReponse,
} from '../interfaces/user.interface'
import { UserRepository } from '../repositories/user.repository'
import { IUser } from '../types/documents/user.document'
import { InvalidObjectIdError } from '../interfaces/error.interface'
import {
  IUserGetUserRequest,
  IUserRegisterRequest,
  IUserUpdateRequest,
} from '../types/requests/user.request'
import {
  IUserGetAllResposne,
  IUserGetUserNotFoundReponse,
  IUserGetUserResponse,
  IUserRegisterErrorResponse,
  IUserRegisterResponse,
  IUserUpdateResposne,
} from '../types/responses/user.response'

@Route('user')
@Tags('User Management')
export class UserController extends Controller {
  constructor() {
    super()
  }

  /**
   * You will be able to register but if the user already exists then it will generate 500 error with message User already exist
   * @summary You will be able to register user and generate the accessToken with it
   */
  @Example({
    name: 'Syed Rahat Murtaza',
    email: 'rahat_murtaza@outlook.com',
    password: 'rahat1996',
  })
  @Post('/registerUser')
  @Response<IUserRegisterResponse>('200', 'User Registerd Successfully')
  @Response<IUserRegisterErrorResponse>('409', 'User Already Exist')
  @Response(
    '403',
    'Forbidden Request',
    "If you don't pass any accessToken It will return a 403 Forbidden Access"
  )
  async registerUser(
    @Body() requestBody: IUserRegisterRequest
  ): Promise<IUserRegisterResponse | IUserRegisterErrorResponse> {
    const response = await new UserRepository().registerUser(requestBody)
    return <IUserRegisterResponse | IUserRegisterErrorResponse>response
  }

  @Get('/getAllUsers')
  async getAllUsers(): Promise<IUserGetAllResposne[]> {
    const users: any = await new UserRepository().getAllUsers()
    return users
  }

  @Post('/getUser')
  @Security('bearerAuth')
  async getUser(
    @Body() reqBody: IUserGetUserRequest
  ): Promise<IUserGetUserResponse> {
    let user: any = await new UserRepository().getUser(reqBody._id)
    console.log(user)

    return <IUserGetUserResponse>user[0]
  }

  @Post('/accessToken')
  async getAccessToken(
    @Body() request: IUserNoDoc
  ): Promise<IUserGetAcessTokenReponse> {
    let tokenFound: string | undefined =
      await new UserRepository().getAccessToken(request)
    let response = { accessToken: tokenFound }
    return <IUserGetAcessTokenReponse>response
  }

  @Put('/updateUser')
  async updateUser(
    @Body() requestBody: IUserUpdateRequest
  ): Promise<IUserUpdateResposne> {
    let newUser = await new UserRepository().updateUser(requestBody)
    return <IUserUpdateResposne>newUser
  }
}
