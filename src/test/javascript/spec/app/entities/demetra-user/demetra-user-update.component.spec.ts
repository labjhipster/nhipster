import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NhipsterTestModule } from '../../../test.module';
import { DemetraUserUpdateComponent } from 'app/entities/demetra-user/demetra-user-update.component';
import { DemetraUserService } from 'app/entities/demetra-user/demetra-user.service';
import { DemetraUser } from 'app/shared/model/demetra-user.model';

describe('Component Tests', () => {
  describe('DemetraUser Management Update Component', () => {
    let comp: DemetraUserUpdateComponent;
    let fixture: ComponentFixture<DemetraUserUpdateComponent>;
    let service: DemetraUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NhipsterTestModule],
        declarations: [DemetraUserUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DemetraUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DemetraUserUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DemetraUserService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DemetraUser(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new DemetraUser();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
