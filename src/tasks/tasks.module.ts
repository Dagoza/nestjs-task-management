import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';

@Module({
  controllers: [TasksController],
  providers: []
})
export class TasksModule {}
