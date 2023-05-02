import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDate,
  IsOptional,
  MaxLength,
  MinDate,
  MinLength,
  ValidateNested,
} from 'class-validator'
import { Limit } from '@/shared/config'
import { Type } from 'class-transformer'
import 'reflect-metadata'

class VoteItem {
  @MaxLength(Limit.holeVoteOptionLength, {
    message: `每个选项最长只能是${Limit.holeVoteOptionLength}个字符哦1`,
  })
  @MinLength(1, { message: '每个选项长度至少要有一个字符哦' })
  value: string
}

export class HolePostVoteClassValidator {
  @MinDate(() => new Date(), { message: '结束时间不能早于当前时间哦' })
  @IsDate()
  @IsOptional()
  endTime: Date = null

  @ArrayMaxSize(Limit.holeVoteMaxLength, {
    message: `最多只能创建${Limit.holeVoteMaxLength}个选项哦`,
  })
  @ArrayMinSize(2, { message: '至少要有两个投票哦' })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => VoteItem)
  items: VoteItem[]
}
