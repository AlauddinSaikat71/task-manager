import {
  InjectRepository,
  isUuid,
  Repository,
  types,
  uuid,
} from '@iaminfinity/express-cassandra';
import { Injectable, NotFoundException } from '@nestjs/common';
import { isString } from 'class-validator';
import { from, map, mergeMap, Observable, toArray } from 'rxjs';
import { CreateTaskDTO, CreateTaskListDTO } from './dto/create-task.dto';
import { TaskQueryDTO } from './dto/task-query.dto';
import { TaskResponseDTO } from './dto/task-response.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskEntity } from './entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,
  ) {}

  public findOne(
    key: string | types.Uuid,
    id: string | types.Uuid,
  ): Observable<TaskEntity> {
    key = isString(key) ? key : key.toString();
    id = isUuid(id) ? id : uuid(id);

    return this.taskRepo.findOne({ key: key, id: id }, { raw: true });
  }

  public countTotalTasks(): Observable<number> {
    return this.taskRepo
      .findAndCount({}, { raw: true })
      .pipe(map(([, count]) => count));
  }

  public createTask(key: string, dto: CreateTaskDTO): Observable<TaskEntity> {
    const newTask = this.taskRepo.create({ key: key, ...dto });

    return this.taskRepo.save(newTask);
  }

  public async createTaskList(body: CreateTaskListDTO) {
    const taskNumber: number = (await this.countTotalTasks().toPromise()) + 1;
    const key = 'TM-' + taskNumber;
    return from(body.list)
      .pipe(
        mergeMap((dto) => this.createTask(key, dto)),
        toArray(),
      )
      .toPromise();
  }

  public async updateTask(
    key: string,
    id: string,
    updateDto: UpdateTaskDTO,
  ): Promise<TaskResponseDTO> {
    const task: TaskEntity = await this.findOne(key, id).toPromise();

    if (!task) {
      throw new NotFoundException(`No Such task found by this key/id`);
    }

    task.issue_type = updateDto.issue_type;
    task.summary = updateDto.summary;
    task.priority = updateDto.priority;
    task.label = updateDto.label;

    await this.taskRepo.save(task).toPromise();

    const response = new TaskResponseDTO();
    response.is_success = true;
    response.message = 'Updated Successfully';

    return response;
  }

  public async deleteTask(query: TaskQueryDTO): Promise<TaskResponseDTO> {
    const task: TaskEntity = await this.findOne(
      query.key,
      query.id,
    ).toPromise();

    if (!task) {
      throw new NotFoundException(`No Such task found by this key/id`);
    }

    await this.taskRepo.remove(task);

    const response = new TaskResponseDTO();
    response.is_success = true;
    response.message = 'Deleted Successfully';

    return response;
  }
}
