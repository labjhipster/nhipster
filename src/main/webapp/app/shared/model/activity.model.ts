import { Moment } from 'moment';
import { ISingleCourse } from 'app/shared/model/single-course.model';
import { IDemetraUser } from 'app/shared/model/demetra-user.model';

export interface IActivity {
  id?: number;
  name?: string;
  description?: string;
  mynumber?: number;
  creationtime?: Moment;
  singleCourse?: ISingleCourse;
  demetrauser?: IDemetraUser;
}

export class Activity implements IActivity {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public mynumber?: number,
    public creationtime?: Moment,
    public singleCourse?: ISingleCourse,
    public demetrauser?: IDemetraUser
  ) {}
}
