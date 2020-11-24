import { Moment } from 'moment';
import { ISingleCourse } from 'app/shared/model/single-course.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { UserType } from 'app/shared/model/enumerations/user-type.model';

export interface IDemetraUser {
  id?: number;
  gender?: Gender;
  address?: string;
  borndate?: Moment;
  cf?: string;
  usertype?: UserType;
  profileimageContentType?: string;
  profileimage?: any;
  singlecourseteachers?: ISingleCourse[];
  coursetitles?: ISingleCourse[];
}

export class DemetraUser implements IDemetraUser {
  constructor(
    public id?: number,
    public gender?: Gender,
    public address?: string,
    public borndate?: Moment,
    public cf?: string,
    public usertype?: UserType,
    public profileimageContentType?: string,
    public profileimage?: any,
    public singlecourseteachers?: ISingleCourse[],
    public coursetitles?: ISingleCourse[]
  ) {}
}
