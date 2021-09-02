import express, { response } from 'express'
import { UserController } from '../controllers/user.controller'
import { InvalidObjectIdError } from '../interfaces/error.interface'
import {
  IUserNoDoc,
  IUserGetAcessTokenReponse,
} from '../interfaces/user.interface'
import { IUser } from '../types/documents/user.document'
import {
  IUserGetUserRequest,
  IUserRegisterRequest,
} from '../types/requests/user.request'
import {
  IUserGetUserNotFoundReponse,
  IUserGetUserResponse,
  IUserRegisterResponse,
} from '../types/responses/user.response'
import { serverSecret } from '../utils/constants'
import jwt from 'jsonwebtoken'

export class UserRoutes {
  router: express.Router

  constructor() {
    this.router = express.Router()
    this.configRoutes()
  }

  configRoutes() {
    // Validate User Route
    this.router.post('/accessToken', async function (req, res, next) {
      let user: IUserNoDoc = req.body
      let resposne: IUserGetAcessTokenReponse =
        await new UserController().getAccessToken(user)
      res.send(resposne)
    })

    // Register User Route
    this.router.post('/registerUser', async function (req, res, next) {
      console.log(req.body)

      let user: IUserRegisterRequest = req.body
      let response: any = await new UserController().registerUser(user)
      res.send(response)
    })

    // Get All Users
    this.router.get('/getAllUsers', async function (req, res, next) {
      let response: any = await new UserController().getAllUsers()
      res.send(response)
    })

    // Update User
    this.router.put('/updateUser', async function (req, res, next) {
      let response: any = await new UserController().updateUser(req.body)
      res.send(response)
    })

    // Get User
    this.router.post(
      '/getUser',
      this.verifyToken,
      async function (req, res, next) {
        let request: IUserGetUserRequest = req.body
        let response: IUserGetUserResponse = await new UserController().getUser(
          request
        )
        res.send(response)
      }
    )

    this.router.post('/user/login', async function (req, res, next) {
      console.log(req)
      const token = jwt.sign(req.body, serverSecret)
      res.send(token)
    })
  }

  /**
   * Format of the token is
   * Bearer <acessToken>
   */
  verifyToken(req: any, res: any, next: any) {
    // Get the Auth Header
    const bearerHeader = req.headers['authorization']

    if (bearerHeader !== undefined) {
      console.log(bearerHeader)

      const bearer = bearerHeader.split(' ')

      const bearerToken = bearer[1]

      req.token = bearerToken

      next()
    } else {
      console.log(bearerHeader)

      res.sendStatus(403)
    }
  }
}

export const UserRouter = new UserRoutes().router
