import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IDemetraUser, DemetraUser } from 'app/shared/model/demetra-user.model';
import { DemetraUserService } from './demetra-user.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ISingleCourse } from 'app/shared/model/single-course.model';
import { SingleCourseService } from 'app/entities/single-course/single-course.service';

@Component({
  selector: 'jhi-demetra-user-update',
  templateUrl: './demetra-user-update.component.html'
})
export class DemetraUserUpdateComponent implements OnInit {
  isSaving = false;
  singlecourses: ISingleCourse[] = [];
  borndateDp: any;

  editForm = this.fb.group({
    id: [],
    gender: [null, [Validators.required]],
    address: [null, [Validators.required]],
    borndate: [null, [Validators.required]],
    cf: [null, [Validators.required]],
    usertype: [null, [Validators.required]],
    profileimage: [],
    profileimageContentType: [],
    coursetitles: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected demetraUserService: DemetraUserService,
    protected singleCourseService: SingleCourseService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demetraUser }) => {
      this.updateForm(demetraUser);

      this.singleCourseService.query().subscribe((res: HttpResponse<ISingleCourse[]>) => (this.singlecourses = res.body || []));
    });
  }

  updateForm(demetraUser: IDemetraUser): void {
    this.editForm.patchValue({
      id: demetraUser.id,
      gender: demetraUser.gender,
      address: demetraUser.address,
      borndate: demetraUser.borndate,
      cf: demetraUser.cf,
      usertype: demetraUser.usertype,
      profileimage: demetraUser.profileimage,
      profileimageContentType: demetraUser.profileimageContentType,
      coursetitles: demetraUser.coursetitles
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

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const demetraUser = this.createFromForm();
    if (demetraUser.id !== undefined) {
      this.subscribeToSaveResponse(this.demetraUserService.update(demetraUser));
    } else {
      this.subscribeToSaveResponse(this.demetraUserService.create(demetraUser));
    }
  }

  private createFromForm(): IDemetraUser {
    return {
      ...new DemetraUser(),
      id: this.editForm.get(['id'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      address: this.editForm.get(['address'])!.value,
      borndate: this.editForm.get(['borndate'])!.value,
      cf: this.editForm.get(['cf'])!.value,
      usertype: this.editForm.get(['usertype'])!.value,
      profileimageContentType: this.editForm.get(['profileimageContentType'])!.value,
      profileimage: this.editForm.get(['profileimage'])!.value,
      coursetitles: this.editForm.get(['coursetitles'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDemetraUser>>): void {
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

  trackById(index: number, item: ISingleCourse): any {
    return item.id;
  }

  getSelected(selectedVals: ISingleCourse[], option: ISingleCourse): ISingleCourse {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
