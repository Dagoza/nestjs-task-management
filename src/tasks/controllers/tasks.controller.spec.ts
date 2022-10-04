import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../services/tasks.service';
import { TasksController } from './tasks.controller';

xdescribe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      imports: [],
      providers: [TasksService]
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
