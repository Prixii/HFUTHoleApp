import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator'
import { Limit } from '@/shared/config'

export class PostHoleValidator {
  @MaxLength(Limit.holeBodyMaxLength, {
    message: `最多只能有${Limit.holeBodyMaxLength}个字哦`,
  })
  @MinLength(1, { message: '树洞至少要有一个字哦' })
  @IsNotEmpty({ message: '不能为空哦' })
  body: string

  @IsArray()
  @IsOptional()
  imgs?: string[]

  @MaxLength(Limit.holeVoteOptionLength, {
    each: true,
    message: `每个选项最长只能是${Limit.holeVoteOptionLength}个字符哦`,
  })
  @ArrayMaxSize(5, { message: '最多只能创建五个标签哦' })
  @IsArray()
  @IsOptional()
  tags: string[] = []

  @ArrayMaxSize(Limit.holeVoteMaxLength, {
    message: `最多只能创建${Limit.holeVoteMaxLength}个选项哦`,
  })
  @MaxLength(Limit.holeVoteOptionLength, {
    each: true,
    message: `每个选项最长只能是${Limit.holeVoteOptionLength}个字符哦`,
  })
  @IsArray()
  @IsOptional()
  votes: string[] = []

  @IsBoolean()
  @IsOptional()
  isMultipleVote = false
}
