import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISingleCourse } from 'app/shared/model/single-course.model';

@Component({
  selector: 'jhi-single-course-detail',
  templateUrl: './single-course-detail.component.html'
})
export class SingleCourseDetailComponent implements OnInit {
  singleCourse: ISingleCourse | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ singleCourse }) => (this.singleCourse = singleCourse));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
