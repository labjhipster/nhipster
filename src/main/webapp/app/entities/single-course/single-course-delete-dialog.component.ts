import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISingleCourse } from 'app/shared/model/single-course.model';
import { SingleCourseService } from './single-course.service';

@Component({
  templateUrl: './single-course-delete-dialog.component.html'
})
export class SingleCourseDeleteDialogComponent {
  singleCourse?: ISingleCourse;

  constructor(
    protected singleCourseService: SingleCourseService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.singleCourseService.delete(id).subscribe(() => {
      this.eventManager.broadcast('singleCourseListModification');
      this.activeModal.close();
    });
  }
}
