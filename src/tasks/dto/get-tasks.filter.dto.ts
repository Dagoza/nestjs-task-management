import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../models/task-status.enum';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  search: string;
}
