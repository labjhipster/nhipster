import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingleCourseController } from '../web/rest/single-course.controller';
import { SingleCourseRepository } from '../repository/single-course.repository';
import { SingleCourseService } from '../service/single-course.service';

@Module({
  imports: [TypeOrmModule.forFeature([SingleCourseRepository])],
  controllers: [SingleCourseController],
  providers: [SingleCourseService],
  exports: [SingleCourseService]
})
export class SingleCourseModule {}
