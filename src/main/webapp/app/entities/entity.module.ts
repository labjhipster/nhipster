import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'demetra-user',
        loadChildren: () => import('./demetra-user/demetra-user.module').then(m => m.NhipsterDemetraUserModule)
      },
      {
        path: 'single-course',
        loadChildren: () => import('./single-course/single-course.module').then(m => m.NhipsterSingleCourseModule)
      },
      {
        path: 'activity',
        loadChildren: () => import('./activity/activity.module').then(m => m.NhipsterActivityModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class NhipsterEntityModule {}
