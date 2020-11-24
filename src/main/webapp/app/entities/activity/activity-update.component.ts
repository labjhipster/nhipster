import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IActivity, Activity } from 'app/shared/model/activity.model';
import { ActivityService } from './activity.service';
import { ISingleCourse } from 'app/shared/model/single-course.model';
import { SingleCourseService } from 'app/entities/single-course/single-course.service';
import { IDemetraUser } from 'app/shared/model/demetra-user.model';
import { DemetraUserService } from 'app/entities/demetra-user/demetra-user.service';

type SelectableEntity = ISingleCourse | IDemetraUser;

@Component({
  selector: 'jhi-activity-update',
  templateUrl: './activity-update.component.html'
})
export class ActivityUpdateComponent implements OnInit {
  isSaving = false;
  singlecourses: ISingleCourse[] = [];
  demetrausers: IDemetraUser[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, []],
    description: [],
    mynumber: [],
    creationtime: [],
    singleCourse: [],
    demetrauser: []
  });

  constructor(
    protected activityService: ActivityService,
    protected singleCourseService: SingleCourseService,
    protected demetraUserService: DemetraUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ activity }) => {
      if (!activity.id) {
        const today = moment().startOf('day');
        activity.creationtime = today;
      }

      this.updateForm(activity);

      this.singleCourseService
        .query({ filter: 'activity-is-null' })
        .pipe(
          map((res: HttpResponse<ISingleCourse[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ISingleCourse[]) => {
          if (!activity.singleCourse || !activity.singleCourse.id) {
            this.singlecourses = resBody;
          } else {
            this.singleCourseService
              .find(activity.singleCourse.id)
              .pipe(
                map((subRes: HttpResponse<ISingleCourse>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ISingleCourse[]) => (this.singlecourses = concatRes));
          }
        });

      this.demetraUserService.query().subscribe((res: HttpResponse<IDemetraUser[]>) => (this.demetrausers = res.body || []));
    });
  }

  updateForm(activity: IActivity): void {
    this.editForm.patchValue({
      id: activity.id,
      name: activity.name,
      description: activity.description,
      mynumber: activity.mynumber,
      creationtime: activity.creationtime ? activity.creationtime.format(DATE_TIME_FORMAT) : null,
      singleCourse: activity.singleCourse,
      demetrauser: activity.demetrauser
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const activity = this.createFromForm();
    if (activity.id !== undefined) {
      this.subscribeToSaveResponse(this.activityService.update(activity));
    } else {
      this.subscribeToSaveResponse(this.activityService.create(activity));
    }
  }

  private createFromForm(): IActivity {
    return {
      ...new Activity(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      mynumber: this.editForm.get(['mynumber'])!.value,
      creationtime: this.editForm.get(['creationtime'])!.value
        ? moment(this.editForm.get(['creationtime'])!.value, DATE_TIME_FORMAT)
        : undefined,
      singleCourse: this.editForm.get(['singleCourse'])!.value,
      demetrauser: this.editForm.get(['demetrauser'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IActivity>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
