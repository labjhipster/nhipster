import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import DemetraUser from '../../domain/demetra-user.entity';
import { DemetraUserService } from '../../service/demetra-user.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/demetra-users')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('demetra-users')
export class DemetraUserController {
  logger = new Logger('DemetraUserController');

  constructor(private readonly demetraUserService: DemetraUserService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: DemetraUser
  })
  async getAll(@Req() req: Request): Promise<DemetraUser[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.demetraUserService.findAndCount({
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
    type: DemetraUser
  })
  async getOne(@Param('id') id: string): Promise<DemetraUser> {
    return await this.demetraUserService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create demetraUser' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: DemetraUser
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() demetraUser: DemetraUser): Promise<DemetraUser> {
    const created = await this.demetraUserService.save(demetraUser);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DemetraUser', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update demetraUser' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DemetraUser
  })
  async put(@Req() req: Request, @Body() demetraUser: DemetraUser): Promise<DemetraUser> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DemetraUser', demetraUser.id);
    return await this.demetraUserService.update(demetraUser);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete demetraUser' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<DemetraUser> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'DemetraUser', id);
    const toDelete = await this.demetraUserService.findById(id);
    return await this.demetraUserService.delete(toDelete);
  }
}
