import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { Module } from '@nestjs/common';
import { WorkLogEntity } from './entity/work-log.entity';
import { WorkLogController } from './work-log.controller';
import { WorkLogService } from './work-log.service';

@Module({
  imports: [ExpressCassandraModule.forFeature([WorkLogEntity])],
  providers: [WorkLogService],
  exports: [WorkLogService],
  controllers: [WorkLogController],
})
export class WorkLogModule {}
