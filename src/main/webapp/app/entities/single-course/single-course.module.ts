import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NhipsterSharedModule } from 'app/shared/shared.module';
import { SingleCourseComponent } from './single-course.component';
import { SingleCourseDetailComponent } from './single-course-detail.component';
import { SingleCourseUpdateComponent } from './single-course-update.component';
import { SingleCourseDeleteDialogComponent } from './single-course-delete-dialog.component';
import { singleCourseRoute } from './single-course.route';

@NgModule({
  imports: [NhipsterSharedModule, RouterModule.forChild(singleCourseRoute)],
  declarations: [SingleCourseComponent, SingleCourseDetailComponent, SingleCourseUpdateComponent, SingleCourseDeleteDialogComponent],
  entryComponents: [SingleCourseDeleteDialogComponent]
})
export class NhipsterSingleCourseModule {}
