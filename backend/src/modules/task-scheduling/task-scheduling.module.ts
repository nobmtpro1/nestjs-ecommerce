import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskSchedulingService } from './task-scheduling.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [],
  providers: [TaskSchedulingService],
  exports: [ScheduleModule],
})
export class TaskSchedulingModule {}
