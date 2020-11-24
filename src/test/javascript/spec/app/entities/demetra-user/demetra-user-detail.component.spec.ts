import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { NhipsterTestModule } from '../../../test.module';
import { DemetraUserDetailComponent } from 'app/entities/demetra-user/demetra-user-detail.component';
import { DemetraUser } from 'app/shared/model/demetra-user.model';

describe('Component Tests', () => {
  describe('DemetraUser Management Detail Component', () => {
    let comp: DemetraUserDetailComponent;
    let fixture: ComponentFixture<DemetraUserDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ demetraUser: new DemetraUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NhipsterTestModule],
        declarations: [DemetraUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DemetraUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DemetraUserDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load demetraUser on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.demetraUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
