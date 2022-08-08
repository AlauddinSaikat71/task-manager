import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class TaskQueryDTO {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsUUID()
  id: string;
}
