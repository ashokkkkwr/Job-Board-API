import type { Router as IRouter } from 'express'
import Router from 'express'
import { UserAuthController } from '../controller/userAuth.controller'
import { catchAsync } from '../utils/catchAsync.utils'
import RequestValidator from '../middleware/Request.Validator'
import upload from '../utils/fileUpload'
const router: IRouter = Router()

const userAuthController = new UserAuthController()

router.post('/register', upload.array('files'),catchAsync(userAuthController.signup))
router.patch('/verify/:id',catchAsync(userAuthController.verifyEmail))
export default router