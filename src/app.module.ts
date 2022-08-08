import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseModule } from './database/database.module';
import { TaskModule } from './modules/task/task.module';
import { WorkLogModule } from './modules/work-log/work-log.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    EventEmitterModule.forRoot({
      global: true,
      wildcard: true,
      delimiter: '.',
    }),
    DatabaseModule,
    TaskModule,
    WorkLogModule,
  ],
})
export class AppModule {}
