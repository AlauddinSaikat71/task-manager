/*
 * Copyright (c) 2021 by Brac-UPG Programme
 * All Rights Reserved by BRAC
 * Powered By BMQA
 * BMQA-BRAC Confidential
 * -----
 * File: collection-point.module.ts
 * Created Date: Sunday, September 12th 2021, 12:54:59 pm
 * Author: Fahim Rahman
 */

import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { Module } from '@nestjs/common';
import { TaskEntity } from './entity/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [ExpressCassandraModule.forFeature([TaskEntity])],
  providers: [TaskService],
  exports: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
