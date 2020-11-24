import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { DemetraUserService } from 'app/entities/demetra-user/demetra-user.service';
import { IDemetraUser, DemetraUser } from 'app/shared/model/demetra-user.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { UserType } from 'app/shared/model/enumerations/user-type.model';

describe('Service Tests', () => {
  describe('DemetraUser Service', () => {
    let injector: TestBed;
    let service: DemetraUserService;
    let httpMock: HttpTestingController;
    let elemDefault: IDemetraUser;
    let expectedResult: IDemetraUser | IDemetraUser[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DemetraUserService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new DemetraUser(0, Gender.MALE, 'AAAAAAA', currentDate, 'AAAAAAA', UserType.STUDENT, 'image/png', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            borndate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DemetraUser', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            borndate: currentDate.format(DATE_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            borndate: currentDate
          },
          returnedFromService
        );

        service.create(new DemetraUser()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DemetraUser', () => {
        const returnedFromService = Object.assign(
          {
            gender: 'BBBBBB',
            address: 'BBBBBB',
            borndate: currentDate.format(DATE_FORMAT),
            cf: 'BBBBBB',
            usertype: 'BBBBBB',
            profileimage: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            borndate: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DemetraUser', () => {
        const returnedFromService = Object.assign(
          {
            gender: 'BBBBBB',
            address: 'BBBBBB',
            borndate: currentDate.format(DATE_FORMAT),
            cf: 'BBBBBB',
            usertype: 'BBBBBB',
            profileimage: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            borndate: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a DemetraUser', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
