import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from '../models/task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTaskFilter } from '../dto/get-tasks.filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter({ status, search }: GetTaskFilter): Task[] {
    let filteredTasks;

    if (status) {
      filteredTasks = this.tasks.filter((task: Task) => task.status === status);
    }

    if (search) {
      filteredTasks = this.tasks.filter(
        (task: Task) =>
          task.title.includes(search) || task.title.includes(search)
      );
    }

    return filteredTasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuid(),
      status: TaskStatus.OPEN,
      ...createTaskDto
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const foundTask = this.tasks.find((task: Task) => task.id === id);
    if (!foundTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return foundTask;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task: Task) => task.id !== id);
  }

  updateTask(task: Partial<Task>): Task {
    const taskToUpdate = this.getTaskById(task.id);
    Object.entries(task).forEach(([key, value]) => (taskToUpdate[key] = value));
    return taskToUpdate;
  }
}
