import {
  Column,
  CreateDateColumn,
  Entity,
  GeneratedUUidColumn,
  UpdateDateColumn,
} from '@iaminfinity/express-cassandra';
import { IssueType } from '../utils/issue-type.enum';
import { TaskPriority } from '../utils/task-priority.enum';

@Entity<TaskEntity>({
  table_name: 'tasks',
  key: ['key', 'id'],
})
export class TaskEntity {
  @Column({ type: 'text' })
  key: string;

  @GeneratedUUidColumn()
  id: any;

  @Column({ type: 'text', default: () => IssueType.TASK })
  issue_type: string;

  @Column({ type: 'text' })
  summary: string;

  @Column({ type: 'text', default: () => TaskPriority.MEDIUM })
  priority: string;

  @Column({ type: 'text' })
  label: string;

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
