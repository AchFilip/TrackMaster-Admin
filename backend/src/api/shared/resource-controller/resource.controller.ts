import { NotFound } from 'http-errors';
import { Request, Response, Router, NextFunction } from 'express';
import { MongooseQueryParser, QueryOptions } from 'mongoose-query-parser';
import { Model, Document } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { ICrudRouteOptions, CrudOperations, IPaginateOptions } from '../interfaces/crud.interface';

export class ResourceController<T extends Document> {

  protected modelSchema: Model<T>;

  constructor(modelSchema: Model<T>) {
    this.modelSchema = modelSchema;
  }

  // #region CRUD methods

  /**
   * Get all resources paginated
   */
  public async getAll(req: Request, res: Response, next?: NextFunction): Promise<any> {
    try {
      const queryOptions = this.parseQueryParameters(req);
      let resources: T[];
      // get resources as list
      resources = await this.modelSchema
        .find(queryOptions.query)
        .select(queryOptions.options.select)
        .populate(queryOptions.options.populate as any)
        .exec();
      return resources;
      // return res
      //   .status(StatusCodes.OK)
      //   .json(resources);

    } catch (e) {
      next ? next(e) : res.status(StatusCodes.BAD_REQUEST).json(e);
    }
  }

  /**
   * Create a new resource model
   */
  public async create(req: Request, res: Response, next?: NextFunction): Promise<any | undefined> {
    try {
      const resource = await new this.modelSchema(req.body)
        .save();
      return resource;
    } catch (e) {
      next ? next(e) : res.status(StatusCodes.BAD_REQUEST).json(e);
    }
  }

  /**
   * Get one resource model by Id
   *
   * @param {string} [id] Model id to be retrieved
   * @returns
   */
  public async getOne(id: string, req: Request, res: Response, next?: NextFunction): Promise<any | undefined> {
    try {
      const modelId: any = id || req.params.id;
      const queryOptions = this.parseQueryParameters(req);

      const resource = await this.modelSchema
        .findOne({ _id: modelId })
        .select(queryOptions.options.select)
        .populate(queryOptions.options.populate as any)
        .orFail(new NotFound())
        .exec();
      return resource;
    } catch (e) {
      next ? next(e) : res.status(StatusCodes.BAD_REQUEST).json(e);
    }
  }

  /**
   * Update one resource model by Id
   *
   * @param {string} [id] Model id to be modified
   * @param {string[]} [blacklist=[]] List of properties to ignore
   * @returns
   */
  public async update(id: string, blacklist: string[] = [], req: Request, res: Response, next?: NextFunction): Promise<any | undefined> {
    try {
      const modelId: any = id || req.params.id;

      // delete blacklisted properties from body
      const defaultBlacklist = ['_id', 'createdAt', 'updatedAt', ...blacklist];
      for (const key of defaultBlacklist) {
        delete req.body[key];
      }

      const resource = await this.modelSchema
        .findOneAndUpdate(
          { _id: modelId },
          req.body,
          { new: true, runValidators: true, context: 'query' }
        )
        .orFail(new NotFound())
        .exec();

      return resource;

    } catch (e) {
      next ? next(e) : res.status(StatusCodes.BAD_REQUEST).json(e);
    }
  }

  /**
   * Delete one resource model by Id
   *
   * @param {string} [id] Model id to be deleted
   */
  public async delete(id: string, req: Request, res: Response, next?: NextFunction): Promise<any | undefined> {
    try {
      const modelId: any = id || req.params.id;

      const resource = await this.modelSchema
        .findOneAndDelete({ _id: modelId })
        .orFail(new NotFound())
        .exec();

      return resource;

    } catch (e) {
      next ? next(e) : res.status(StatusCodes.BAD_REQUEST).json(e);
    }
  }

  // #endregion CRUD methods
  // --------------------------------------

  // #region Helper methods

  /**
   * Parse all query params from URL
   *
   * @protected
   * @param {Request} req
   * @param {string[]} [blacklist=[]]
   * @param {string} [skipKey='page']
   * @param {string} [limitKey='perPage']
   * @returns {{ query: QueryOptions['filter'], options: PaginateOptions }}
   */
  protected parseQueryParameters(
    req: Request,
    blacklist: string[] = [],
    skipKey: string = 'page',
    limitKey: string = 'perPage'
  ): { query: QueryOptions['filter'], options: IPaginateOptions } {

    const queryOptions = new MongooseQueryParser({ limitKey, skipKey, blacklist })
      .parse(req.query);

    return {
      query: queryOptions.filter,
      options: {
        select: queryOptions.select,
        sort: queryOptions.sort,
        populate: queryOptions.populate,
        page: queryOptions.skip || 1,
        lean: false,
        leanWithId: false,
        limit: queryOptions.limit || 10,
      }
    };
  }

  // #endregion Helper methods
  // --------------------------------------

}
