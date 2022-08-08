import {
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from '@iaminfinity/express-cassandra';

@Entity<WorkLogEntity>({
  table_name: 'work_logs',
  key: ['assignee_id', 'task_key'],
})
export class WorkLogEntity {
  @Column({ type: 'text' })
  assignee_id: string;

  @Column({ type: 'text' })
  task_key: string;

  @Column({ type: 'text' })
  task_id: string;

  @Column({ type: 'int' })
  hour: number;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'text' })
  created_by: string;

  @Column({ type: 'text' })
  updated_by: string;

  @Column({
    type: 'boolean',
    default: () => true,
  })
  is_active: boolean;
}
