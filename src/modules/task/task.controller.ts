import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskListDTO } from './dto/create-task.dto';
import { TaskQueryDTO } from './dto/task-query.dto';
import { TaskDTO, TaskResponseDTO } from './dto/task-response.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskService } from './task.service';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOkResponse({ type: TaskDTO, isArray: true })
  @Post()
  @HttpCode(HttpStatus.OK)
  public createTask(@Body() dto: CreateTaskListDTO) {
    return this.taskService.createTaskList(dto);
  }

  @ApiOkResponse({ type: TaskResponseDTO })
  @Patch()
  @HttpCode(HttpStatus.OK)
  public updateTask(
    @Query() query: TaskQueryDTO,
    @Body() body: UpdateTaskDTO,
  ): Promise<TaskResponseDTO> {
    return this.taskService.updateTask(query.key, query.id, body);
  }

  @ApiOkResponse({ type: TaskResponseDTO })
  @Delete()
  @HttpCode(HttpStatus.OK)
  public deleteTask(@Query() query: TaskQueryDTO): Promise<TaskResponseDTO> {
    return this.taskService.deleteTask(query);
  }
}
