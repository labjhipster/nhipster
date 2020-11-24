import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NhipsterSharedModule } from 'app/shared/shared.module';
import { DemetraUserComponent } from './demetra-user.component';
import { DemetraUserDetailComponent } from './demetra-user-detail.component';
import { DemetraUserUpdateComponent } from './demetra-user-update.component';
import { DemetraUserDeleteDialogComponent } from './demetra-user-delete-dialog.component';
import { demetraUserRoute } from './demetra-user.route';

@NgModule({
  imports: [NhipsterSharedModule, RouterModule.forChild(demetraUserRoute)],
  declarations: [DemetraUserComponent, DemetraUserDetailComponent, DemetraUserUpdateComponent, DemetraUserDeleteDialogComponent],
  entryComponents: [DemetraUserDeleteDialogComponent]
})
export class NhipsterDemetraUserModule {}
