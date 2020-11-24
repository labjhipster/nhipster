import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NhipsterTestModule } from '../../../test.module';
import { DemetraUserComponent } from 'app/entities/demetra-user/demetra-user.component';
import { DemetraUserService } from 'app/entities/demetra-user/demetra-user.service';
import { DemetraUser } from 'app/shared/model/demetra-user.model';

describe('Component Tests', () => {
  describe('DemetraUser Management Component', () => {
    let comp: DemetraUserComponent;
    let fixture: ComponentFixture<DemetraUserComponent>;
    let service: DemetraUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NhipsterTestModule],
        declarations: [DemetraUserComponent]
      })
        .overrideTemplate(DemetraUserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DemetraUserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DemetraUserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DemetraUser(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.demetraUsers && comp.demetraUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
