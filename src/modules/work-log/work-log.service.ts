import { InjectRepository, Repository } from '@iaminfinity/express-cassandra';
import { Injectable } from '@nestjs/common';
import { from, mergeMap, Observable, toArray } from 'rxjs';
import {
  CreateWorkLogDTO,
  CreateWorkLogListDTO,
} from './dto/create-work-log.dto';
import { WorkLogEntity } from './entity/work-log.entity';

@Injectable()
export class WorkLogService {
  constructor(
    @InjectRepository(WorkLogEntity)
    private readonly taskRepo: Repository<WorkLogEntity>,
  ) {}

  public createWorkLog(dto: CreateWorkLogDTO): Observable<WorkLogEntity> {
    const workLog = this.taskRepo.create(dto);
    return this.taskRepo.save(workLog);
  }

  public createWorkLogs(
    body: CreateWorkLogListDTO,
  ): Observable<WorkLogEntity[]> {
    return from(body.list).pipe(
      mergeMap((x) => this.createWorkLog(x)),
      toArray(),
    );
  }
}
