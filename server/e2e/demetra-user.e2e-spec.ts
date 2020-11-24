import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import DemetraUser from '../src/domain/demetra-user.entity';
import { DemetraUserService } from '../src/service/demetra-user.service';

describe('DemetraUser Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId'
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    delete: (): any => entityMock
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(DemetraUserService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all demetra-users ', async () => {
    const getEntities: DemetraUser[] = (
      await request(app.getHttpServer())
        .get('/api/demetra-users')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET demetra-users by id', async () => {
    const getEntity: DemetraUser = (
      await request(app.getHttpServer())
        .get('/api/demetra-users/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create demetra-users', async () => {
    const createdEntity: DemetraUser = (
      await request(app.getHttpServer())
        .post('/api/demetra-users')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update demetra-users', async () => {
    const updatedEntity: DemetraUser = (
      await request(app.getHttpServer())
        .put('/api/demetra-users')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE demetra-users', async () => {
    const deletedEntity: DemetraUser = (
      await request(app.getHttpServer())
        .delete('/api/demetra-users/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
