import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import SingleCourse from '../../domain/single-course.entity';
import { SingleCourseService } from '../../service/single-course.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/single-courses')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('single-courses')
export class SingleCourseController {
  logger = new Logger('SingleCourseController');

  constructor(private readonly singleCourseService: SingleCourseService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: SingleCourse
  })
  async getAll(@Req() req: Request): Promise<SingleCourse[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.singleCourseService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: SingleCourse
  })
  async getOne(@Param('id') id: string): Promise<SingleCourse> {
    return await this.singleCourseService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create singleCourse' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: SingleCourse
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() singleCourse: SingleCourse): Promise<SingleCourse> {
    const created = await this.singleCourseService.save(singleCourse);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'SingleCourse', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update singleCourse' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: SingleCourse
  })
  async put(@Req() req: Request, @Body() singleCourse: SingleCourse): Promise<SingleCourse> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'SingleCourse', singleCourse.id);
    return await this.singleCourseService.update(singleCourse);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete singleCourse' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<SingleCourse> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'SingleCourse', id);
    const toDelete = await this.singleCourseService.findById(id);
    return await this.singleCourseService.delete(toDelete);
  }
}
