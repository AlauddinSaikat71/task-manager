import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateWorkLogDTO {
  @ApiProperty()
  @IsUUID()
  assignee_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  task_key: string;

  @ApiProperty()
  @IsUUID()
  task_id: string;

  @ApiProperty()
  @IsNumber()
  hour: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreateWorkLogListDTO {
  @ApiProperty({ type: CreateWorkLogDTO, isArray: true })
  @Type(() => CreateWorkLogDTO)
  @IsArray()
  @ValidateNested()
  list: CreateWorkLogDTO[];
}
