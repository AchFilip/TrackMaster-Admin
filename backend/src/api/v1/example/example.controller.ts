import { Request, Response, NextFunction, Router } from 'express';
import { Logger } from '../../shared/utils/logger';

export class ExampleController {
    private logger: Logger = new Logger();
    /**
     * Apply all routes for example
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();
        router
            .get('/hello', this.getExample);

        return router;
    }

    /**
     * Sens a example message back as a response
     */
    public getExample(req: Request, res: Response) {
        this.logger.debug('getExample request');
        res.json({ message: 'hello there!' });
    }
}
