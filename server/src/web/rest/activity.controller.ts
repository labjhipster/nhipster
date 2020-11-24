import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Activity from '../../domain/activity.entity';
import { ActivityService } from '../../service/activity.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/activities')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('activities')
export class ActivityController {
  logger = new Logger('ActivityController');

  constructor(private readonly activityService: ActivityService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Activity
  })
  async getAll(@Req() req: Request): Promise<Activity[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.activityService.findAndCount({
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
    type: Activity
  })
  async getOne(@Param('id') id: string): Promise<Activity> {
    return await this.activityService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create activity' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Activity
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() activity: Activity): Promise<Activity> {
    const created = await this.activityService.save(activity);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Activity', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update activity' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Activity
  })
  async put(@Req() req: Request, @Body() activity: Activity): Promise<Activity> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Activity', activity.id);
    return await this.activityService.update(activity);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete activity' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Activity> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Activity', id);
    const toDelete = await this.activityService.findById(id);
    return await this.activityService.delete(toDelete);
  }
}
