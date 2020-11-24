import { EntityRepository, Repository } from 'typeorm';
import Activity from '../domain/activity.entity';

@EntityRepository(Activity)
export class ActivityRepository extends Repository<Activity> {}
