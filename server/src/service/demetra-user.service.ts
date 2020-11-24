import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import DemetraUser from '../domain/demetra-user.entity';
import { DemetraUserRepository } from '../repository/demetra-user.repository';

const relationshipNames = [];
relationshipNames.push('coursetitles');

@Injectable()
export class DemetraUserService {
  logger = new Logger('DemetraUserService');

  constructor(@InjectRepository(DemetraUserRepository) private demetraUserRepository: DemetraUserRepository) {}

  async findById(id: string): Promise<DemetraUser | undefined> {
    const options = { relations: relationshipNames };
    return await this.demetraUserRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<DemetraUser>): Promise<DemetraUser | undefined> {
    return await this.demetraUserRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<DemetraUser>): Promise<[DemetraUser[], number]> {
    options.relations = relationshipNames;
    return await this.demetraUserRepository.findAndCount(options);
  }

  async save(demetraUser: DemetraUser): Promise<DemetraUser | undefined> {
    return await this.demetraUserRepository.save(demetraUser);
  }

  async update(demetraUser: DemetraUser): Promise<DemetraUser | undefined> {
    return await this.save(demetraUser);
  }

  async delete(demetraUser: DemetraUser): Promise<DemetraUser | undefined> {
    return await this.demetraUserRepository.remove(demetraUser);
  }
}
