import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'Answer', name: 'Survey_RestAPI' })
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  surveyId: number;

  @Column({ type: 'int', nullable: false })
  questionId: number;

  @Column({ type: 'int', nullable: false })
  answerNumber: number;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  updatedAt: Date;

  // 관계설정
  // Answers - Surveys : N : 1 관계
  @ManyToOne(() => Survey, (survey) => survey.answers)
  @JoinColumn({ name: 'surveyId' })
  survey: Promise<Survey>;

  // Answers - Questions : 1 : 1 관계
  @OneToOne(() => Question, (question) => question.answer)
  @JoinColumn({ name: 'questionId' })
  question: Question;

  // Answer - User : N : 1 관계
  @ManyToOne(() => User, (user) => user.answers)
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;
}