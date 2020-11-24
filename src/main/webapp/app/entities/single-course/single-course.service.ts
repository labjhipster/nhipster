import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISingleCourse } from 'app/shared/model/single-course.model';

type EntityResponseType = HttpResponse<ISingleCourse>;
type EntityArrayResponseType = HttpResponse<ISingleCourse[]>;

@Injectable({ providedIn: 'root' })
export class SingleCourseService {
  public resourceUrl = SERVER_API_URL + 'api/single-courses';

  constructor(protected http: HttpClient) {}

  create(singleCourse: ISingleCourse): Observable<EntityResponseType> {
    return this.http.post<ISingleCourse>(this.resourceUrl, singleCourse, { observe: 'response' });
  }

  update(singleCourse: ISingleCourse): Observable<EntityResponseType> {
    return this.http.put<ISingleCourse>(this.resourceUrl, singleCourse, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISingleCourse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISingleCourse[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
