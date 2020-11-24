import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { NhipsterTestModule } from '../../../test.module';
import { SingleCourseUpdateComponent } from 'app/entities/single-course/single-course-update.component';
import { SingleCourseService } from 'app/entities/single-course/single-course.service';
import { SingleCourse } from 'app/shared/model/single-course.model';

describe('Component Tests', () => {
  describe('SingleCourse Management Update Component', () => {
    let comp: SingleCourseUpdateComponent;
    let fixture: ComponentFixture<SingleCourseUpdateComponent>;
    let service: SingleCourseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NhipsterTestModule],
        declarations: [SingleCourseUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SingleCourseUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SingleCourseUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SingleCourseService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SingleCourse(123);
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
        const entity = new SingleCourse();
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
