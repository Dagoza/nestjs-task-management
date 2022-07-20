import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../models/task.model';

export class GetTaskFilter {
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsOptional()
  search: string;
}
