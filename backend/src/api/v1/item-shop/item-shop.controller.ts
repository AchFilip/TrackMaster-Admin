import { Request, Response, NextFunction, Router } from 'express';
import { IItem, ItemModel } from './item.model';
import { ResourceController } from '../../shared';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../shared/utils/logger';

export class ItemShopController extends ResourceController<IItem>{

    private logger: Logger = new Logger();
    constructor() {
        super(ItemModel);
    }
    /**
     * Apply all routes for example
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();
        router
            .get('/', this.getItems)
            .get('/initialize', this.initializeItems)
            .get('/:id', this.getItemById)
            .post('/', this.postItem)
            .put('/:id', this.updateItem)
            .delete('/:id', this.deleteItem);

        return router;
    }

    /**
     * Sends a message containing all tasks back as a response
     * @param req
     * @param res 
     */
    getItems = async (req: Request, res: Response) => {
        this.logger.debug('getItems request');
        const allTasks = await this.getAll(req, res);
        return res
            .status(StatusCodes.OK)
            .json(allTasks);
    }

    /**
     * Creates a new task
     * @param req
     * @param res
     */

    postItem = async (req: Request, res: Response) => {
        this.logger.debug('postItem request');
        const task = await this.create(req, res);
        return res
            .status(StatusCodes.OK)
            .json(task);
    }

    /**
     * Delete task by id
     * @param req 
     * @param res 
     */
    deleteItem = async (req: Request, res: Response) => {
        this.logger.debug('deleteItem request');
        const task = await this.delete(req.params.id, req, res);
        return res
            .status(StatusCodes.OK)
            .json(task);

    }

    /**
     * Update task by id
     * @param req 
     * @param res 
     */
    updateItem = async (req: Request, res: Response) => {
        this.logger.debug('updateItem request');
        const task = await this.update(req.params.id, req.body.blacklist, req, res);
        return res
            .status(StatusCodes.OK)
            .json(task);
    }

    /**
     * Get single task by id
     * @param req 
     * @param res 
     */
    getItemById = async (req: Request, res: Response) => {
        this.logger.debug('getItemById request');
        const item = await this.getOne(req.params.id, req, res);
        return res
            .status(StatusCodes.OK)
            .json(item);
    }

    /**
     * Initialize items
     * @param req 
     * @param res 
     */
    initializeItems = async (req: Request, res: Response) => {
        console.log("-->");
        this.logger.debug('initialize items request');
        let items: any[] = [
            {
                name: "Milk",
                description: "Milk is a white liquid food produced by the mammary glands of mammals. It is the primary source of nutrition for young mammals (including breastfed human infants) before they are able to digest solid food.[1] Immune factors and immune-modulating components in milk contribute to milk immunity. Early-lactation milk, which is called colostrum, contains antibodies that strengthen the immune system, and thus reduces the risk of many diseases. Milk contains many nutrients, including protein and lactose.[2]",
                image: "item-shop/milk.jpg",
                price: 2,
                rating: 4,
                isAvailable: true,
                selected: false
            },
            {
                name: "Cereal Bar",
                description: "Energy bars are supplemental bars containing cereals, micronutrients, and flavor ingredients intended to supply quick food energy. Because most energy bars contain added protein, carbohydrates, dietary fiber, and other nutrients, they may be marketed as functional foods.[1] Manufacturing of energy bars may supply nutrients in sufficient quantity to be used as meal replacements.[2]",
                image: "item-shop/cereal bar.jpg",
                price: 3.5,
                rating: 5,
                isAvailable: true,
                selected: false
            },
            {
                name: "Honey",
                description: "Honey is a sweet and viscous substance made by several bees, the best-known of which are honey bees.[1][2] Honey is made and stored to nourish bee colonies. Bees produce honey by gathering and then refining the sugary secretions of plants (primarily floral nectar) or the secretions of other insects, like the honeydew of aphids. This refinement takes place both within individual bees, through regurgitation and enzymatic activity, as well as during storage in the hive, through water evaporation that concentrates the honey's sugars until it is thick and viscous.",
                image: "item-shop/honey.jpg",
                price: 2,
                rating: 4,
                isAvailable: true,
                selected: false
            }
        ]

        await ItemModel.insertMany(items)
            .then(function (docs) {
                res.json(docs);
            })
            .catch(function (err) {
                res.status(500);
            });
        return res
            .status(StatusCodes.OK);
    }
}
