import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ISingleCourse, SingleCourse } from 'app/shared/model/single-course.model';
import { SingleCourseService } from './single-course.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IDemetraUser } from 'app/shared/model/demetra-user.model';
import { DemetraUserService } from 'app/entities/demetra-user/demetra-user.service';

@Component({
  selector: 'jhi-single-course-update',
  templateUrl: './single-course-update.component.html'
})
export class SingleCourseUpdateComponent implements OnInit {
  isSaving = false;
  demetrausers: IDemetraUser[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [],
    isnotonlyfordegree: [null, [Validators.required]],
    cfu: [],
    courseimage: [],
    courseimageContentType: [],
    amount: [],
    cfteacher: [null, Validators.required]
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected singleCourseService: SingleCourseService,
    protected demetraUserService: DemetraUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ singleCourse }) => {
      this.updateForm(singleCourse);

      this.demetraUserService.query().subscribe((res: HttpResponse<IDemetraUser[]>) => (this.demetrausers = res.body || []));
    });
  }

  updateForm(singleCourse: ISingleCourse): void {
    this.editForm.patchValue({
      id: singleCourse.id,
      title: singleCourse.title,
      description: singleCourse.description,
      isnotonlyfordegree: singleCourse.isnotonlyfordegree,
      cfu: singleCourse.cfu,
      courseimage: singleCourse.courseimage,
      courseimageContentType: singleCourse.courseimageContentType,
      amount: singleCourse.amount,
      cfteacher: singleCourse.cfteacher
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('nhipsterApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const singleCourse = this.createFromForm();
    if (singleCourse.id !== undefined) {
      this.subscribeToSaveResponse(this.singleCourseService.update(singleCourse));
    } else {
      this.subscribeToSaveResponse(this.singleCourseService.create(singleCourse));
    }
  }

  private createFromForm(): ISingleCourse {
    return {
      ...new SingleCourse(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      isnotonlyfordegree: this.editForm.get(['isnotonlyfordegree'])!.value,
      cfu: this.editForm.get(['cfu'])!.value,
      courseimageContentType: this.editForm.get(['courseimageContentType'])!.value,
      courseimage: this.editForm.get(['courseimage'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      cfteacher: this.editForm.get(['cfteacher'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISingleCourse>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IDemetraUser): any {
    return item.id;
  }
}
