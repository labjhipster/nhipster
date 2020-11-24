import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISingleCourse } from 'app/shared/model/single-course.model';
import { SingleCourseService } from './single-course.service';
import { SingleCourseDeleteDialogComponent } from './single-course-delete-dialog.component';

@Component({
  selector: 'jhi-single-course',
  templateUrl: './single-course.component.html'
})
export class SingleCourseComponent implements OnInit, OnDestroy {
  singleCourses?: ISingleCourse[];
  eventSubscriber?: Subscription;

  constructor(
    protected singleCourseService: SingleCourseService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.singleCourseService.query().subscribe((res: HttpResponse<ISingleCourse[]>) => (this.singleCourses = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSingleCourses();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISingleCourse): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInSingleCourses(): void {
    this.eventSubscriber = this.eventManager.subscribe('singleCourseListModification', () => this.loadAll());
  }

  delete(singleCourse: ISingleCourse): void {
    const modalRef = this.modalService.open(SingleCourseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.singleCourse = singleCourse;
  }
}
