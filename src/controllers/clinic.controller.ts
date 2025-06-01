import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import {
    IClinicCreateDTO,
    IClinicUpdateDTO,
} from "../interfaces/clinic.interface";
import { IQuery } from "../interfaces/query.interface";
import { clinicService } from "../services/clinicService";

class ClinicController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as any as IQuery;
            const data = await clinicService.getAll(query);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = res.locals.tokenPayload;
            const body = req.body as IClinicCreateDTO;
            const data = await clinicService.create(body, userId);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await clinicService.getById(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const body = req.body as IClinicUpdateDTO;
            const data = await clinicService.updateById(id, body);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await clinicService.deleteById(id);
            res.status(StatusCodesEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
}

export const clinicController = new ClinicController();
