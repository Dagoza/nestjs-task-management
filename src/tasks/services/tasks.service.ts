import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from '../models/task-status.enum';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTaskFilterDto } from '../dto/get-tasks.filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');

    status && query.andWhere('task.status = :status', { status });

    search &&
      query.andWhere(
        'LOWER(task.title) LIKE :search OR LOWER(task.description) LIKE :search',
        { search: `%${search.toLowerCase()}%` }
      );
    const task = query.getMany();
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    const foundTask = await this.taskRepository.findOne({ where: { id } });
    if (!foundTask) {
      this.notFoundById(id);
    }
    return foundTask;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.create({
      ...createTaskDto,
      status: TaskStatus.OPEN
    });
    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const deletedResult = await this.taskRepository.delete({ id });
    if (!deletedResult.affected) {
      this.notFoundById(id);
    }
  }

  async updateTask(task: Partial<Task>): Promise<Task> {
    const taskToUpdate = await this.getTaskById(task.id);
    Object.entries(task).forEach(([key, value]) => (taskToUpdate[key] = value));
    await this.taskRepository.save(task);
    return taskToUpdate;
  }

  private notFoundById(id: string): never {
    throw new NotFoundException(`Task with ID "${id}" not found`);
  }
}
