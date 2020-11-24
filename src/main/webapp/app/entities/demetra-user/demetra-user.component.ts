import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDemetraUser } from 'app/shared/model/demetra-user.model';
import { DemetraUserService } from './demetra-user.service';
import { DemetraUserDeleteDialogComponent } from './demetra-user-delete-dialog.component';

@Component({
  selector: 'jhi-demetra-user',
  templateUrl: './demetra-user.component.html'
})
export class DemetraUserComponent implements OnInit, OnDestroy {
  demetraUsers?: IDemetraUser[];
  eventSubscriber?: Subscription;

  constructor(
    protected demetraUserService: DemetraUserService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.demetraUserService.query().subscribe((res: HttpResponse<IDemetraUser[]>) => (this.demetraUsers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDemetraUsers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDemetraUser): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInDemetraUsers(): void {
    this.eventSubscriber = this.eventManager.subscribe('demetraUserListModification', () => this.loadAll());
  }

  delete(demetraUser: IDemetraUser): void {
    const modalRef = this.modalService.open(DemetraUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.demetraUser = demetraUser;
  }
}
