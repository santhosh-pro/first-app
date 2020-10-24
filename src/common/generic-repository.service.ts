import { ClientSession, Document, DocumentQuery, Model, Types } from 'mongoose';
import { BasePaginatedResponse } from './BaseResponseModel';
import { MongoosePaginateQuery } from './MongoosePaginateQuery';
import { MongooseQueryModel } from './MongooseQueryModel';


export class BaseService<T extends Document> {
  constructor(private model: Model<T>) {
  }
  get dbModel() {
    return this.model;
  }
  public async findAll(model: MongooseQueryModel): Promise<T[]> {
    const query = this.model.find({ ...model.filter, ...DEFAULT_QUERY_FILTER });
    this.queryBuilder(model, query);

    return query.exec();
  }

  public async findById(id: string, populate: Array<any> = [], select?: string, isLean = false): Promise<T> {
    const query = this.model.findById(this.toObjectId(id)).where(DEFAULT_QUERY_FILTER);

    if (populate && populate.length) {
      query.populate(populate);
    }

    if (isLean) {
      query.lean();
    }

    return query.exec();
  }

  public async findOne(model: MongooseQueryModel): Promise<T> {
    const query = this.model.findOne({ ...model.filter, ...DEFAULT_QUERY_FILTER });
    this.queryBuilder(model, query);

    return query.exec();
  }

  public async create(doc: T | T[] | Partial<T> | Partial<T[]>, session: ClientSession): Promise<T | T[]> {
    return await this.model.create(doc as any, { session });
  }

  public async updateById(id: any, updatedDoc: any, session: ClientSession): Promise<T> {
    return await this.model
      .updateOne({ _id: id }, updatedDoc, { session }).exec();
  }

  public async update(condition: any, updatedDoc: any, session: ClientSession): Promise<T> {
    return await this.model
      .updateOne(condition, updatedDoc, { session }).exec();
  }

  public async bulkUpdate(filter: any, updatedDoc: any, session: ClientSession) {
    return this.model
      .update(filter, updatedDoc, { session, multi: true });
  }

  public async paged(filter: any = {},populate:any, options: Partial<MongoosePaginateQuery> | any): Promise<BasePaginatedResponse<any>> {
    options.pageSize = Number(options.pageSize) || DEFAULT_PAGINATED_ITEMS_COUNT;
    options.pageNumber = Number(options.pageNumber) || 1;

    const query = this.model
      .find({ ...filter })
      .skip((options.pageSize * options.pageNumber) - options.pageSize)
      .limit(options.pageSize);

    if (populate) {
      query.populate(populate);
    }

    if (options.select) {
      query.select(options.select);
    }

    if (options.orderByPropertyName) {
      query.sort({ [options.orderByPropertyName]: options.sortingDirection || 'asc' });
    }

    const result = await query.lean().exec();
    result.forEach((doc:any) => {
      doc.id = String(doc._id);
    });
    const numberOfDocs = await this.model.countDocuments({ ...filter });

    return {
      pageNumber: options.pageNumber,
      totalItems: numberOfDocs,
      totalPages: Math.ceil(numberOfDocs / options.pageSize),
      pageSize: options.pageSize,
      items: result
    };
  }

  // public async getAll(filter: any = {}, populate: Array<any> = []) {
  //   const query = this.model.find({ ...filter, ...DEFAULT_QUERY_FILTER });
  //   if (populate && populate.length) {
  //     query.populate(populate);
  //   }
  //   return query.lean().exec();
  // }

  public async count(filter: any = {}): Promise<number> {
    return this.model.count(filter);
  }

  public async delete(id: string, session: ClientSession): Promise<T> {
    return this.model
      .update({ id: this.toObjectId(id) } as any, { isDeleted: true } as any,session)
      .exec();
  }

  public toObjectId(id: string | number): Types.ObjectId {
    return new Types.ObjectId(id);
  }

  public isValidObjectId(id: string) {
    return Types.ObjectId.isValid(id);
  }

  public async startSession(): Promise<ClientSession> {
    const session = await this.model.db.startSession();
    session.startTransaction();
    return session;
  }

  public async commitTransaction(session: ClientSession) {
    await session.commitTransaction();
    session.endSession();
  }

  public async abortTransaction(session: ClientSession) {
    await session.abortTransaction();
    session.endSession();
  }

  async withRetrySession(txnFn: Function) {
    const startTime = Date.now();
    while (true) {
      const session = await this.startSession();
      try {
        const result = await txnFn(session);
        await this.commitTransaction(session);
        return result;
      } catch (e) {
        const isTransientError = e.errorLabels && e.errorLabels.includes('TransientTransactionError') && this.hasNotTimedOut(startTime, MAX_TRANSACTION_RETRY_TIMEOUT);
        const isCommitError = e.errorLabels && e.errorLabels.includes('UnknownTransactionCommitResult') && this.hasNotTimedOut(startTime, MAX_TRANSACTION_RETRY_TIMEOUT);

        if (!isTransientError || !isCommitError) {
          await this.handleError(session, e);
        }
      }
    }
  }

  private hasNotTimedOut(startTime, max) {
    return Date.now() - startTime < max;
  }

  protected async handleError(session, err) {
    await this.abortTransaction(session);
    throw err;
  }

  private queryBuilder(model: MongooseQueryModel, query: DocumentQuery<any, any>) {
    if (model.populate && model.populate.length) {
      query.populate(model.populate);
    }

    if (model.select) {
      query.select(model.select);
    }

    if (model.lean) {
      query.lean();
    }

    if (model.sort) {
      query.sort({ [model.sort]: model.sortBy || 'asc' });
    }
  }

}


export const DEFAULT_QUERY_FILTER = {
    isDeleted: false
  };
  
  export const DEFAULT_PAGINATED_ITEMS_COUNT = 10;
  
  export const MAX_TRANSACTION_RETRY_TIMEOUT = 120000;

 
  