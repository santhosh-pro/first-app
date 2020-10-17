import { QueryFindOptions, QueryFindBaseOptions, QueryFindOneAndUpdateOptions, QueryFindOneAndRemoveOptions, Types } from 'mongoose';
import { IPagination } from './pagination';

export interface IEntityRepositoryService<Entity> {
  create(model: Entity): Promise<Entity>;
  find(query?): Promise<IPagination<Entity>>;
  findById(id: Types.ObjectId): Promise<Entity>;
  findOne(conditions): Promise<Entity>;
  findOneAndUpdate(id: Types.ObjectId, newModel: Entity): Promise<any>;
  findOneAndDelete(id: Types.ObjectId): Promise<any>;
}