import { IsEnum } from 'class-validator';
import { TaskStatus } from '../models/task-status.enum';

export default class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
