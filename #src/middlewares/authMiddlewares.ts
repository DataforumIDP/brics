import { body } from "express-validator"
import { inputValidationMiddleware } from "./inputValidationMiddleware"

const passwordMiddlewares = body('password').isLength({min: 4, max: 30})
const logindMiddlewares = body('login').isLength({min: 4, max: 30})

export const authMiddlewares = [
    passwordMiddlewares,
    logindMiddlewares,
    inputValidationMiddleware
]