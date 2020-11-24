import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDemetraUser } from 'app/shared/model/demetra-user.model';

@Component({
  selector: 'jhi-demetra-user-detail',
  templateUrl: './demetra-user-detail.component.html'
})
export class DemetraUserDetailComponent implements OnInit {
  demetraUser: IDemetraUser | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demetraUser }) => (this.demetraUser = demetraUser));
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
