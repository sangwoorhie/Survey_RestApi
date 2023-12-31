import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Status } from 'src/routes/user/userinfo';

// Sign-Up(회원가입)
export class SignUpReqDto {
  @ApiProperty({
    required: true,
    description: '이메일',
    example: 'nestjs@naver.com',
  })
  @IsEmail()
  @MinLength(4)
  @MaxLength(20)
  @Matches(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    {
      message: '이메일 형식이 올바르지 않습니다.',
    },
  )
  email: string;

  @ApiProperty({
    required: true,
    description: '비밀번호',
    example: 'Password123',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/, {
    message:
      '비밀번호는 최소 4자 이상의 영문 대소문자 및 숫자로 이루어져야 합니다.',
  })
  password: string;

  @ApiProperty({
    required: true,
    description: '확인 비밀번호',
    example: 'Password123',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  confirmPassword: string;

  @ApiProperty({
    required: true,
    description: '이름',
    example: 'Jake',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @ApiProperty({
    required: true,
    description: '사용자 신분',
    example: 'teacher',
  })
  @IsEnum(Status, {
    message: `학생일 경우 'student', 교사일 경우 'teacher'를 입력해주세요.`,
  })
  status: Status;
}

// Sign-In(로그인)
export class SignInReqDto {
  @ApiProperty({ required: true, description: '이메일' })
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  @IsString()
  @IsEmail()
  @MaxLength(60)
  email: string;

  @ApiProperty({ required: true, description: '비밀번호' })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/)
  password: string;
}
