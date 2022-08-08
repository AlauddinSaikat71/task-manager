import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { Module } from '@nestjs/common';
import { CassandraOptionFactoryService } from './cassandra-option-factory.service';

@Module({
  imports: [
    ExpressCassandraModule.forRootAsync({
      useClass: CassandraOptionFactoryService,
    }),
  ],
})
export class DatabaseModule {}
