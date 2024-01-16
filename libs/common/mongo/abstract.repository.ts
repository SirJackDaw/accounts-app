import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery, SaveOptions, Connection } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>, private readonly connection: Connection) {}

  async create(document: Omit<TDocument, '_id'>, options?: SaveOptions): Promise<TDocument> {
    return new this.model({ ...document }).save(options);
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery);

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, { lean: true, new: true });

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async updateMany(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>) {
    return this.model.updateMany(filterQuery, update)
  }

  async upsert(filterQuery: FilterQuery<TDocument>, document: Partial<TDocument>) {
    return this.model.findOneAndUpdate(filterQuery, document, { lean: true, upsert: true, new: true });
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery);
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}