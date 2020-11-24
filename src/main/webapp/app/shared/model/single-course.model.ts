import { IActivity } from 'app/shared/model/activity.model';
import { IDemetraUser } from 'app/shared/model/demetra-user.model';

export interface ISingleCourse {
  id?: number;
  title?: string;
  description?: string;
  isnotonlyfordegree?: boolean;
  cfu?: number;
  courseimageContentType?: string;
  courseimage?: any;
  amount?: number;
  activity?: IActivity;
  cfteacher?: IDemetraUser;
  cfstudents?: IDemetraUser[];
}

export class SingleCourse implements ISingleCourse {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public isnotonlyfordegree?: boolean,
    public cfu?: number,
    public courseimageContentType?: string,
    public courseimage?: any,
    public amount?: number,
    public activity?: IActivity,
    public cfteacher?: IDemetraUser,
    public cfstudents?: IDemetraUser[]
  ) {
    this.isnotonlyfordegree = this.isnotonlyfordegree || false;
  }
}
