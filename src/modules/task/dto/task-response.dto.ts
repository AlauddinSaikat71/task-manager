import { ApiResponseProperty } from '@nestjs/swagger';

export class TaskDTO {
  @ApiResponseProperty()
  key: string;

  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  issue_type: string;

  @ApiResponseProperty()
  summary: string;

  @ApiResponseProperty()
  priority: string;

  @ApiResponseProperty()
  label: string;
}

export class TaskResponseDTO {
  @ApiResponseProperty()
  is_success: boolean;

  @ApiResponseProperty()
  message: string;
}
