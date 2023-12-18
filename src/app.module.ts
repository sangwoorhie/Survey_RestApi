import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './option/option.module';
import { AnswerModule } from './answer/answer.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SurveyModule, QuestionModule, OptionModule, AnswerModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
