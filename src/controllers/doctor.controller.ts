import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import {
    IDoctorCreateDTO,
    IDoctorUpdateDTO,
} from "../interfaces/doctor.interface";
import { doctorService } from "../services/doctor.service";

class DoctorController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await doctorService.getAll();
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const doctor = req.body as IDoctorCreateDTO;
            const data = await doctorService.create(doctor);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const doctorId = req.params.id;
            const data = await doctorService.getById(doctorId);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const doctorId = req.params.id;
            const doctor = req.body as IDoctorUpdateDTO;
            const data = await doctorService.updateById(doctorId, doctor);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const doctorId = req.params.id;
            await doctorService.deleteById(doctorId);
            res.status(StatusCodesEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
}

export const doctorController = new DoctorController();
