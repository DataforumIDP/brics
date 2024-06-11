import { Request, Response } from "express"


export class Admin {
    
    async massReg(req, res: Response) {

    }

    async getList(req: Request, res: Response, data) {

        const {user} = req
        res.json(user)
    }

    async update(req, res: Response) {

    }

    async delete (req, res: Response) {

    }
}