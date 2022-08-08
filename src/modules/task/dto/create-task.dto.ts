import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IssueType } from '../utils/issue-type.enum';
import { TaskLabel } from '../utils/task-label.enum';
import { TaskPriority } from '../utils/task-priority.enum';

export class CreateTaskDTO {
  @ApiProperty({ enum: IssueType })
  @IsEnum(IssueType)
  issue_type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  summary: string;

  @ApiProperty({ enum: TaskPriority })
  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @ApiProperty({ enum: TaskLabel })
  @IsEnum(TaskLabel)
  label: TaskLabel;
}

export class CreateTaskListDTO {
  @ApiProperty({ type: CreateTaskDTO, isArray: true })
  @Type(() => CreateTaskDTO)
  @IsArray()
  @ValidateNested()
  list: CreateTaskDTO[];
}
