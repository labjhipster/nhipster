import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Activity from '../domain/activity.entity';
import { ActivityRepository } from '../repository/activity.repository';

const relationshipNames = [];
relationshipNames.push('demetrauser');

@Injectable()
export class ActivityService {
  logger = new Logger('ActivityService');

  constructor(@InjectRepository(ActivityRepository) private activityRepository: ActivityRepository) {}

  async findById(id: string): Promise<Activity | undefined> {
    const options = { relations: relationshipNames };
    return await this.activityRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Activity>): Promise<Activity | undefined> {
    return await this.activityRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Activity>): Promise<[Activity[], number]> {
    options.relations = relationshipNames;
    return await this.activityRepository.findAndCount(options);
  }

  async save(activity: Activity): Promise<Activity | undefined> {
    return await this.activityRepository.save(activity);
  }

  async update(activity: Activity): Promise<Activity | undefined> {
    return await this.save(activity);
  }

  async delete(activity: Activity): Promise<Activity | undefined> {
    return await this.activityRepository.remove(activity);
  }
}
