import { TaskStatus } from '../models/task.model';

export class GetTaskFilter {
  status: TaskStatus;
  search: string;
}
