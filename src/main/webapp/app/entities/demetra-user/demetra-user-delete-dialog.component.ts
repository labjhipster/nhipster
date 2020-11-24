import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDemetraUser } from 'app/shared/model/demetra-user.model';
import { DemetraUserService } from './demetra-user.service';

@Component({
  templateUrl: './demetra-user-delete-dialog.component.html'
})
export class DemetraUserDeleteDialogComponent {
  demetraUser?: IDemetraUser;

  constructor(
    protected demetraUserService: DemetraUserService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.demetraUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast('demetraUserListModification');
      this.activeModal.close();
    });
  }
}
