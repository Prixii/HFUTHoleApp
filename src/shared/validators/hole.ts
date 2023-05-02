import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { Limit } from '@/shared/config'
import { Type } from 'class-transformer'
import { HolePostVoteClassValidator } from '@/shared/validators/hole/post'

export class PostHoleValidator {
  @MaxLength(Limit.holeBodyMaxLength, {
    message: `最多只能有${Limit.holeBodyMaxLength}个字哦`,
  })
  @MinLength(1, { message: '树洞至少要有一个字哦' })
  @IsNotEmpty({ message: '不能为空哦' })
  body: string

  @ArrayMaxSize(4, { message: '最多只能上传4张图片哦' })
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

  @ValidateNested()
  @Type(() => HolePostVoteClassValidator)
  @IsOptional()
  vote: HolePostVoteClassValidator

  @IsBoolean()
  @IsOptional()
  isMultipleVote = false
}
