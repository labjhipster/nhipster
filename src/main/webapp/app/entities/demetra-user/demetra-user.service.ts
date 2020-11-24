import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDemetraUser } from 'app/shared/model/demetra-user.model';

type EntityResponseType = HttpResponse<IDemetraUser>;
type EntityArrayResponseType = HttpResponse<IDemetraUser[]>;

@Injectable({ providedIn: 'root' })
export class DemetraUserService {
  public resourceUrl = SERVER_API_URL + 'api/demetra-users';

  constructor(protected http: HttpClient) {}

  create(demetraUser: IDemetraUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(demetraUser);
    return this.http
      .post<IDemetraUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(demetraUser: IDemetraUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(demetraUser);
    return this.http
      .put<IDemetraUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDemetraUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDemetraUser[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(demetraUser: IDemetraUser): IDemetraUser {
    const copy: IDemetraUser = Object.assign({}, demetraUser, {
      borndate: demetraUser.borndate && demetraUser.borndate.isValid() ? demetraUser.borndate.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.borndate = res.body.borndate ? moment(res.body.borndate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((demetraUser: IDemetraUser) => {
        demetraUser.borndate = demetraUser.borndate ? moment(demetraUser.borndate) : undefined;
      });
    }
    return res;
  }
}
