import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { NhipsterTestModule } from '../../../test.module';
import { SingleCourseComponent } from 'app/entities/single-course/single-course.component';
import { SingleCourseService } from 'app/entities/single-course/single-course.service';
import { SingleCourse } from 'app/shared/model/single-course.model';

describe('Component Tests', () => {
  describe('SingleCourse Management Component', () => {
    let comp: SingleCourseComponent;
    let fixture: ComponentFixture<SingleCourseComponent>;
    let service: SingleCourseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NhipsterTestModule],
        declarations: [SingleCourseComponent]
      })
        .overrideTemplate(SingleCourseComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SingleCourseComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SingleCourseService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SingleCourse(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.singleCourses && comp.singleCourses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
