import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import SingleCourse from '../domain/single-course.entity';
import { SingleCourseRepository } from '../repository/single-course.repository';

const relationshipNames = [];
relationshipNames.push('cfteacher');

@Injectable()
export class SingleCourseService {
  logger = new Logger('SingleCourseService');

  constructor(@InjectRepository(SingleCourseRepository) private singleCourseRepository: SingleCourseRepository) {}

  async findById(id: string): Promise<SingleCourse | undefined> {
    const options = { relations: relationshipNames };
    return await this.singleCourseRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<SingleCourse>): Promise<SingleCourse | undefined> {
    return await this.singleCourseRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<SingleCourse>): Promise<[SingleCourse[], number]> {
    options.relations = relationshipNames;
    return await this.singleCourseRepository.findAndCount(options);
  }

  async save(singleCourse: SingleCourse): Promise<SingleCourse | undefined> {
    return await this.singleCourseRepository.save(singleCourse);
  }

  async update(singleCourse: SingleCourse): Promise<SingleCourse | undefined> {
    return await this.save(singleCourse);
  }

  async delete(singleCourse: SingleCourse): Promise<SingleCourse | undefined> {
    return await this.singleCourseRepository.remove(singleCourse);
  }
}
