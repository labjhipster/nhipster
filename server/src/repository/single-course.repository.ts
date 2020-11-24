import { EntityRepository, Repository } from 'typeorm';
import SingleCourse from '../domain/single-course.entity';

@EntityRepository(SingleCourse)
export class SingleCourseRepository extends Repository<SingleCourse> {}
