import { EntityRepository, Repository } from 'typeorm';
import DemetraUser from '../domain/demetra-user.entity';

@EntityRepository(DemetraUser)
export class DemetraUserRepository extends Repository<DemetraUser> {}
