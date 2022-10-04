import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../models/task-status.enum';
import { TasksService } from './tasks.service';

const mockTaskRepository = () => ({
  createQueryBuilder: () => ({
    andWhere: jest.fn(),
    getMany: jest.fn()
  })
});

const mockUser: User = {
  username: 'Daniel',
  id: 'test',
  password: 'SomePassword',
  tasks: []
};

const mockTask: Task[] = [
  {
    id: 'SomeId',
    description: 'Test description',
    status: TaskStatus.OPEN,
    title: 'Test 1',
    user: mockUser
  }
];

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useFactory: mockTaskRepository
        }
      ]
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTasks', () => {
    it('Calls getTasks and return the results', async () => {
      mockTaskRepository()
        .createQueryBuilder()
        .getMany.mockResolvedValue(mockTask);
      const result = await service.getTasks(
        { status: null, search: null },
        mockUser
      );
      expect(result).toEqual(mockTask);
    });
  });
});
