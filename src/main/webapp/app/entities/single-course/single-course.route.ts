import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISingleCourse, SingleCourse } from 'app/shared/model/single-course.model';
import { SingleCourseService } from './single-course.service';
import { SingleCourseComponent } from './single-course.component';
import { SingleCourseDetailComponent } from './single-course-detail.component';
import { SingleCourseUpdateComponent } from './single-course-update.component';

@Injectable({ providedIn: 'root' })
export class SingleCourseResolve implements Resolve<ISingleCourse> {
  constructor(private service: SingleCourseService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISingleCourse> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((singleCourse: HttpResponse<SingleCourse>) => {
          if (singleCourse.body) {
            return of(singleCourse.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SingleCourse());
  }
}

export const singleCourseRoute: Routes = [
  {
    path: '',
    component: SingleCourseComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'nhipsterApp.singleCourse.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SingleCourseDetailComponent,
    resolve: {
      singleCourse: SingleCourseResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'nhipsterApp.singleCourse.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SingleCourseUpdateComponent,
    resolve: {
      singleCourse: SingleCourseResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'nhipsterApp.singleCourse.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SingleCourseUpdateComponent,
    resolve: {
      singleCourse: SingleCourseResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'nhipsterApp.singleCourse.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
