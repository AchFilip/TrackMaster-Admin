import { Request, Response, NextFunction, Router } from 'express';
import { ResourceController } from '../../shared';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../shared/utils/logger';
import {Driver, DriverModel} from "./driver.model";

export class DriverController extends ResourceController<Driver>{
    private logger: Logger = new Logger();
    constructor() {
        super(DriverModel);
    }
    /**
     * Apply all routes for tasks
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();
        router
            .get('', this.getDrivers)
            .post('', this.postDriver)
        return router;
    }

    getDrivers = async (req: Request, res: Response) => {
        this.logger.debug('GET Drivers request');

        const allDrivers = await this.getAll(req, res);

        return res
            .status(StatusCodes.OK)
            .json(allDrivers);
    }

    postDriver = async (req: Request, res: Response) => {
        this.logger.debug('post order request');

        const task = await this.create(req, res);

        return res
            .status(StatusCodes.OK)
            .json(task);
    }
}