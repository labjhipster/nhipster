import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDemetraUser, DemetraUser } from 'app/shared/model/demetra-user.model';
import { DemetraUserService } from './demetra-user.service';
import { DemetraUserComponent } from './demetra-user.component';
import { DemetraUserDetailComponent } from './demetra-user-detail.component';
import { DemetraUserUpdateComponent } from './demetra-user-update.component';

@Injectable({ providedIn: 'root' })
export class DemetraUserResolve implements Resolve<IDemetraUser> {
  constructor(private service: DemetraUserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDemetraUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((demetraUser: HttpResponse<DemetraUser>) => {
          if (demetraUser.body) {
            return of(demetraUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DemetraUser());
  }
}

export const demetraUserRoute: Routes = [
  {
    path: '',
    component: DemetraUserComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'nhipsterApp.demetraUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DemetraUserDetailComponent,
    resolve: {
      demetraUser: DemetraUserResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'nhipsterApp.demetraUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DemetraUserUpdateComponent,
    resolve: {
      demetraUser: DemetraUserResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'nhipsterApp.demetraUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DemetraUserUpdateComponent,
    resolve: {
      demetraUser: DemetraUserResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'nhipsterApp.demetraUser.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
