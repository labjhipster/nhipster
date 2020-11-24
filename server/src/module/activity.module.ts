import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityController } from '../web/rest/activity.controller';
import { ActivityRepository } from '../repository/activity.repository';
import { ActivityService } from '../service/activity.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityRepository])],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService]
})
export class ActivityModule {}
