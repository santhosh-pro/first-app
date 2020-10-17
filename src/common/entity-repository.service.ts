import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { QueryFindOptions, QueryFindBaseOptions, QueryFindOneAndUpdateOptions, QueryFindOneAndRemoveOptions, Types, Model } from 'mongoose';
import { IEntityRepositoryService } from './entity-repository.interface';
import { getErrorMessage } from './error-handler';
import { IPagination } from './pagination';

@Injectable()
export class EntityRepositoryService<Entity extends BaseModel> implements IEntityRepositoryService<Entity> {
    constructor( private readonly repository: Model<Entity>) {
    }
    
    async find(query?: any): Promise<IPagination<Entity>> {
        try {
            const total = await this.repository.countDocuments(query);
            const items = await this.repository.find(query).exec();
            return { items, total };
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async create(model):Promise<Entity> {
        try {
            return await this.repository.create(model);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

   

    async findById(id: Types.ObjectId): Promise<Entity> {
        try {
            const model = await this.repository.findById(id);
            if (model) {
                return model;
            } else {
                throw new HttpException(`No  with that identifier has been found`, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            return model;
        } catch (ex) {
             throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async findOne(conditions):Promise<Entity> {
        try {
            return await this.repository.findOne(conditions);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async findOneAndUpdate(id, newModel): Promise<any> {
        try {
            const model = await this.repository.findOneAndUpdate({ _id: id }, newModel, { new: true });
            if (model) {
                return model;
            } else {
                throw new HttpException(`No with that identifier has been found`, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            return model;
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async findOneAndDelete(id) {
        try {
            const result = await this.repository.findOneAndDelete({ _id: id }, {});
            return result;
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async count(query?) {
        try {
            return await this.repository.countDocuments(query);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }        
    }
}

import { Document } from 'mongoose';

export class BaseModel extends Document {}