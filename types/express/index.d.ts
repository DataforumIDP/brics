import * as express from 'express';
import { UserData } from '../../#src/models/userDataModel';

declare global {
    namespace Express {
        interface Request {
            user?: UserData
        }
    }
}
