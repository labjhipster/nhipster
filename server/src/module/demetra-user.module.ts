import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemetraUserController } from '../web/rest/demetra-user.controller';
import { DemetraUserRepository } from '../repository/demetra-user.repository';
import { DemetraUserService } from '../service/demetra-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([DemetraUserRepository])],
  controllers: [DemetraUserController],
  providers: [DemetraUserService],
  exports: [DemetraUserService]
})
export class DemetraUserModule {}
