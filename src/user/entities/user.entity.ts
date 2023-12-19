import { Answer } from 'src/answer/entities/answer.entity';
import { Survey } from 'src/survey/entities/survey.entity';
import { Option } from 'src/option/entities/option.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../userinfo';
import { Question } from 'src/question/entities/question.entity';

@Entity({ schema: 'User', name: 'Survey_RestAPI' })
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({ type: 'varchar', length: 30 })
  password: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({ type: 'enum', enum: Status, default: Status.TEACHER })
  status: Status;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  updatedAt: Date;

  // 관계설정
  // User - Survey : 1 : N 관계
  @OneToMany(() => Survey, (surveys) => surveys.user, {
    cascade: false,
  })
  surveys: Promise<Survey[]>;

  // User - Answer : 1 : N 관계
  @OneToMany(() => Answer, (answers) => answers.user, {
    cascade: false,
  })
  answers: Promise<Answer[]>; // Lazy Relations

  // User - Option : 1 : N 관계
  @OneToMany(() => Option, (options) => options.user, {
    cascade: true,
  })
  options: Promise<Option[]>;

  // User - Question : 1 : N 관계
  @OneToMany(() => Question, (questions) => questions.user, {
    cascade: true,
  })
  questions: Promise<Question[]>;
}
