import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateWorkLogListDTO } from './dto/create-work-log.dto';
import { WorkLogEntity } from './entity/work-log.entity';
import { WorkLogService } from './work-log.service';

@ApiTags('Work-Logs')
@Controller('work-logs')
export class WorkLogController {
  constructor(private readonly workLogService: WorkLogService) {}

  @ApiOkResponse({ type: WorkLogEntity, isArray: true })
  @Post()
  @HttpCode(HttpStatus.OK)
  public createWorkLogs(
    @Body() body: CreateWorkLogListDTO,
  ): Observable<WorkLogEntity[]> {
    return this.workLogService.createWorkLogs(body);
  }
}
