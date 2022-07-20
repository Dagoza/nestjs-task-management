import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTaskFilter } from '../dto/get-tasks.filter.dto';
import UpdateTaskStatusDto from '../dto/update-task-status.dto';
import { Task } from '../models/task.model';
import { TasksService } from '../services/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilter): Task[] {
    if (!Object.keys(filterDto).length) {
      return this.tasksService.getAllTasks();
    }
    return this.tasksService.getTasksWithFilter(filterDto);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto
  ): Task {
    return this.tasksService.updateTask({ id, ...updateTaskStatusDto });
  }
}
