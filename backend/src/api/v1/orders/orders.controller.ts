import { Request, Response, NextFunction, Router } from 'express';
import { Order, OrderModel } from './order.model';
import { ResourceController } from '../../shared';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../shared/utils/logger';
export class OrdersController extends ResourceController<Order>{
    private logger: Logger = new Logger();
    constructor() {
        super(OrderModel);
    }
    /**
     * Apply all routes for tasks
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();
        router
            .get('/available', this.getAvailableOrders)
            .post('/available', this.postOrder)
            .get('/completed', this.getCompletedOrders)
            .get('/ongoing', this.getOngoingOrders)

        return router;
    }

    getAvailableOrders = async (req: Request, res: Response) => {
        this.logger.debug('GET Available orders request');

        const allOrders = await this.getAll(req, res);

        const allAvailableOrders = allOrders.filter(this.isAvailable);
        return res
            .status(StatusCodes.OK)
            .json(allAvailableOrders);
    }

    getCompletedOrders = async (req: Request, res: Response) => {
        this.logger.debug('GET Completed orders request');

        const allOrders = await this.getAll(req, res);

        const allAvailableOrders = allOrders.filter(this.isCompleted);
        return res
            .status(StatusCodes.OK)
            .json(allAvailableOrders);
    }

    getOngoingOrders = async (req: Request, res: Response) => {
        this.logger.debug('GET Ongoing orders request');

        const allOrders = await this.getAll(req, res);

        const allAvailableOrders = allOrders.filter(this.isOngoing);
        return res
            .status(StatusCodes.OK)
            .json(allAvailableOrders);
    }

    postOrder = async (req: Request, res: Response) => {
        this.logger.debug('post order request');

        const task = await this.create(req, res);

        return res
            .status(StatusCodes.OK)
            .json(task);
    }

    // Ulits
    isAvailable(event: any){
        const status = 'available';
        return (event.status === status);
    }

    isCompleted(event: any){
        const status = 'completed';
        return (event.status === status);
    }

    isOngoing(event: any){
        const status = 'ongoing';
        return (event.status === status);
    }
}